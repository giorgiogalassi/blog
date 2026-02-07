// Next.js 16+ expects the explicit .js entrypoint for this flat-config import
// on some environments (notably Windows), otherwise module resolution can fail.
import nextVitals from 'eslint-config-next/core-web-vitals.js';

export default [...nextVitals];
