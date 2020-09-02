export const fetchJson = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

export const getIconId = (icon) => {
  switch (icon) {
    case 'award':
      return 'trophy';

    case 'github':
      return 'github';

    case 'code':
      return 'code';

    case 'data':
      return 'data';

    case 'link':
      return 'globe';

    default:
      return null;
  }
};

export const supportsWebGl2 = () =>
  new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('webgl2');
    if (ctx) resolve(true);
    else resolve(false);
  });
