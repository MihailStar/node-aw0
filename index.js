/* eslint-disable no-console, no-restricted-syntax */
import getArrayOfLength from './helpers/getArrayOfLength.js';
import Browser from './helpers/browser.js';
import parseData from './helpers/parseData.js';
import writeData from './helpers/writeData.js';

const URL = 'https://geekbrains.ru/tests';
const NUMBER_OF_TESTS = 300;

/**
 * @returns {Promise<void>}
 */
async function main() {
  try {
    const browser = new Browser();
    const tests = [];

    for await (const number of getArrayOfLength(NUMBER_OF_TESTS)) {
      const id = number.toString(10);

      console.time(id);

      const url = `${URL}/${number}`;
      const { isFound, layout } = await browser.getPageLayout(url);

      if (isFound) {
        tests.push({ id, ...parseData(layout) });
      }

      console.timeEnd(id);
    }

    await browser.close();
    await writeData(tests);
  } catch (error) {
    console.error(error);
  }
}

main();
