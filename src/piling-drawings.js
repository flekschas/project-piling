import { createWorker } from '@flekschas/utils';

import createPilingJs from './piling.js';
import coverAggregatorWorker from './piling-drawings-cover-aggregator-worker';

import { fetchJson } from './utils';

const baseUrl = 'https://storage.googleapis.com/pilingjs';

const coverOptions = { size: 128, lineWidth: 3, log: true };

const renderStroke = (ctx, strokes, size) => {
  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();

  for (let s = 0; s < strokes.length; s++) {
    const xPos = strokes[s][0];
    const yPos = strokes[s][1];
    ctx.moveTo((xPos[0] / 256) * size, (yPos[0] / 256) * size);
    for (let i = 0; i < xPos.length; i++) {
      ctx.lineTo((xPos[i] / 256) * size, (yPos[i] / 256) * size);
    }
    ctx.stroke();
  }

  // Needed for Safari
  return new Uint8Array(ctx.getImageData(0, 0, size, size).data.buffer);
};

const createGoogleQuickDrawRenderer = (size = 64) => (sources) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  return Promise.resolve(
    sources.map((src) =>
      window.PIXI.Texture.fromBuffer(renderStroke(ctx, src, size), size, size)
    )
  );
};

const createGoogleQuickDrawCoverRenderer = ({ size = 64 } = {}) => (sources) =>
  Promise.all(
    sources.map((src) => window.PIXI.Texture.fromBuffer(src, size, size))
  );

const createGoogleQuickDrawCoverAggregator = ({
  size = 64,
  lineWidth = 2,
  log = false,
} = {}) => (items) =>
  new Promise((resolve, reject) => {
    const worker = createWorker(coverAggregatorWorker);

    worker.onmessage = (e) => {
      if (e.data.error) reject(e.data.error);
      else resolve(e.data.rgba);
      worker.terminate();
    };

    worker.postMessage({
      lineWidth,
      items,
      size,
      log,
    });
  });

const quickDrawRenderer = createGoogleQuickDrawRenderer();
const quickDrawCoverAggregator = createGoogleQuickDrawCoverAggregator(
  coverOptions
);
const quickDrawCoverRenderer = createGoogleQuickDrawCoverRenderer(coverOptions);

const create = async (element) => {
  const items = await fetchJson(`${baseUrl}/drawings/teapot-500.json`);

  const piling = createPilingJs(element, {
    items,
    darkMode: true,
    renderer: quickDrawRenderer,
    coverRenderer: quickDrawCoverRenderer,
    coverAggregator: quickDrawCoverAggregator,
    itemSize: 24,
    columns: 15,
    cellPadding: 8,
    pileCoverInvert: true,
    pileItemInvert: true,
    pileItemOffset: [0, 0],
    // pileBackgroundColor: 'rgba(0, 0, 0, 0)',
    // pileBackgroundColorHover: 'rgba(0, 0, 0, 1.0)',
    pileBorderOpacityHover: 0,
    pileScale: (pile) => 1 + Math.min((pile.items.length - 1) * 0.05, 2),
    pileVisibilityItems: (pile) => pile.items.length === 1,
    // backgroundColor: '#ffffff',
    // lassoFillColor: '#000000',
    // lassoStrokeColor: '#000000',
    zoomScale: (cameraScale) =>
      cameraScale >= 1 ? 1 + (cameraScale - 1) / 2 : cameraScale,
  });

  piling.subscribe(
    'itemUpdate',
    () => piling.arrangeBy('uv', 'umapEmbedding'),
    1
  );

  return piling;
};

export default create;
