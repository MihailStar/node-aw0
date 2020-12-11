import puppeteer from 'puppeteer';

const PUPPETEER_LAUNCH_OPTIONS = {
  args: [
    '--disable-accelerated-2d-canvas',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-setuid-sandbox',
    '--no-sandbox',
    '--window-size=1920x1080',
  ],
};

export default class Browser {
  constructor() {
    this.instance = null;
  }

  /**
   * @returns {Promise<void>}
   */
  async open() {
    if (this.instance === null) {
      this.instance = await puppeteer.launch(PUPPETEER_LAUNCH_OPTIONS);
    }
  }

  /**
   * @returns {Promise<void>}
   */
  async close() {
    await this.instance.close();
  }

  /**
   * @param {string} url
   * @returns {Promise<{isFound: boolean, layout: string}>}
   */
  async getPageLayout(url) {
    if (this.instance === null) {
      this.instance = await puppeteer.launch(PUPPETEER_LAUNCH_OPTIONS);
    }

    const page = await this.instance.newPage();
    const response = await page.goto(url);
    const layout = await page.content();

    page.close();

    return { isFound: response.ok(), layout };
  }
}
