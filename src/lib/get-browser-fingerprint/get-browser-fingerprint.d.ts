declare module 'get-browser-fingerprint' {
    export function getBrowserFingerprint(option: {enableWebgl?: boolean }): string;
    export default getBrowserFingerprint;
  }