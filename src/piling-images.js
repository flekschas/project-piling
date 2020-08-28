import createPilingJs, { createImageRenderer } from './piling.js';

const baseUrl = 'https://storage.googleapis.com/pilingjs/books';
const imageRenderer = createImageRenderer();

const create = async (element) =>
  createPilingJs(element, {
    darkMode: true,
    cellPadding: 16,
    columns: 4,
    coverAggregator: (items) => items[items.length - 1].src,
    coverRenderer: imageRenderer,
    itemSizeRange: [1, 1],
    pileBorderSize: 1,
    pileCellAlignment: 'center',
    pileOrderItems: (pile) => [...pile.items].reverse(),
    pileVisibilityItems: true,
    previewAggregator: (items) => items.map((item) => item.edge),
    previewAlignment: 'left',
    previewOffset: 1,
    previewRenderer: imageRenderer,
    previewScaleToCover: ['auto', true],
    renderer: imageRenderer,
    items: [
      {
        src: `${baseUrl}/visual-complexity-cover.jpg`,
        edge: `${baseUrl}/visual-complexity-edge.jpg`,
        scale: 1.0,
      },
      {
        src: `${baseUrl}/isotype-cover.jpg`,
        edge: `${baseUrl}/isotype-edge.jpg`,
        scale: 0.9,
      },
      {
        src: `${baseUrl}/a-mind-at-play-cover.jpg`,
        edge: `${baseUrl}/a-mind-at-play-edge.jpg`,
        scale: 1.0,
      },
      {
        src: `${baseUrl}/dont-make-me-think-cover.jpg`,
        edge: `${baseUrl}/dont-make-me-think-edge.jpg`,
        scale: 0.9,
      },
      {
        src: `${baseUrl}/universal-principles-of-design-cover.jpg`,
        edge: `${baseUrl}/universal-principles-of-design-edge.jpg`,
        scale: 1.0,
      },
      {
        src: `${baseUrl}/ambient-findability-cover.jpg`,
        edge: `${baseUrl}/ambient-findability-edge.jpg`,
        scale: 0.85,
      },
      {
        src: `${baseUrl}/graphesis-cover.jpg`,
        edge: `${baseUrl}/graphesis-edge.jpg`,
        scale: 0.7,
      },
      {
        src: `${baseUrl}/articulating-design-decisions-cover.jpg`,
        edge: `${baseUrl}/articulating-design-decisions-edge.jpg`,
        scale: 0.85,
      },
      {
        src: `${baseUrl}/search-patterns-cover.jpg`,
        edge: `${baseUrl}/search-patterns-edge.jpg`,
        scale: 0.85,
      },
    ],
  });

export default create;
