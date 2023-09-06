import { HTML_COLOR_MAP } from './html-color-map';

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export function deepMerge(...objects: any[]) {
  if (objects.length <= 0) {
    throw new Error('Call to deepMerge without arguments');
  }

  const isObject = (obj: any) => obj && typeof obj === 'object';

  return objects.reduce((prev, curr) => {
    if (curr) {
      Object.keys(curr).forEach((key) => {
        const pVal = prev[key];
        const oVal = curr[key];

        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          prev[key] = pVal.concat(...oVal);
        } else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = deepMerge(pVal, oVal);
        } else {
          prev[key] = oVal;
        }
      });
    }

    return prev;
  }, {});
}

/**
 * Get opposite color from the given color.
 * If the bw option is true, it inverts black & white which is generally better when you want to get
 * foreground color with background color as param.
 *
 * https://stackoverflow.com/a/35970186/10440469
 * @param color
 * @param bw
 */
export function invertColor(color: string, bw = false) {
  let hex = color;
  if ((HTML_COLOR_MAP as any)[hex]) {
    hex = (HTML_COLOR_MAP as any)[hex];
  }

  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }

  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }

  // invert color components & padZero
  const invertAndPadZero = (val: number) => {
    const invert = (255 - val).toString(16);
    return invert.length === 2 ? invert : '0' + invert;
  };
  return '#' + invertAndPadZero(r) + invertAndPadZero(g) + invertAndPadZero(b);
}
