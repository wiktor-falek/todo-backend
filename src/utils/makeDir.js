import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const makeDir = (dir) => {
    return path.join(__dirname, "..", dir);
}

export default makeDir;