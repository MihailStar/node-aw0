/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATH = path.join(__dirname, '../data/data.json');

/**
 * @param {Object} data
 * @returns {Promise<void>}
 */
export default async function writeData(data) {
  await fs.writeFile(PATH, JSON.stringify(data, null, 2));
}
