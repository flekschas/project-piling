import createPilingJs, {
  createMatrixRenderer,
  createMatrixCoverAggregator,
  createMatrixPreviewAggregator,
} from './piling.js';

import { fetchJson } from './utils';

const baseUrl = 'https://storage.googleapis.com/pilingjs/';

const create = async (element) => {
  const colorMapOrRd = await fetchJson(`${baseUrl}colormaps/orange-red.json`);
  const colorMapRdPu = await fetchJson(`${baseUrl}colormaps/red-purple.json`);
  const items = await fetchJson(
    `${baseUrl}matrices/rao-2014-gm12878-chr-22-peaks-subsample-64-v2.json`
  );

  const itemRenderer = createMatrixRenderer({ colorMap: colorMapRdPu });
  const previewRenderer = createMatrixRenderer({
    colorMap: colorMapRdPu,
    shape: [1, 16],
  });
  const coverRenderer = createMatrixRenderer({
    colorMap: colorMapOrRd,
  });

  const coverAggregator = createMatrixCoverAggregator('mean');
  const previewAggregator = createMatrixPreviewAggregator('mean');

  return createPilingJs(element, {
    items,
    darkMode: true,
    itemRenderer: itemRenderer.renderer,
    previewRenderer: previewRenderer.renderer,
    coverRenderer: coverRenderer.renderer,
    coverAggregator,
    previewAggregator,
    columns: 8,
    pileCellAlignment: 'center',
    pileScale: (pile) => 1 + Math.min((pile.items.length - 1) * 0.05, 0.5),
    pileOrderItems: (pileState) => [...pileState.items].sort((a, b) => a - b),
    previewScaling: (pile) => [
      1,
      Math.max(0.1, 1 - (pile.items.length - 2) / 20),
    ],
    previewOffset: 1,
    previewPadding: 2,
    previewSpacing: (pile) => Math.max(0, 2 - (pile.items.length - 2) / 20),
  });
};

export default create;
