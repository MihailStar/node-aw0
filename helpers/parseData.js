import cheerio from 'cheerio';

/**
 * @param {string} layout
 * @returns {{
    title: string,
    description: string,
    complexity: string,
    statistics: Array<string>,
    topics: Array<string>
  }}
 */
export default function parseData(layout) {
  const $ = cheerio.load(layout);
  const $info = $('.test-inf');
  const $title = $('.header__title', $info);
  const $description = $('.header__description', $info);
  const $complexity = $('input[name="score"]', $info);
  const $statistics = $('.statistics-item__data', $info);
  const $topics = $('.topics-list__item', $info);

  return {
    title: $title.text().trim(),
    description: $description.text().trim(),
    complexity: $complexity.val().trim(),
    statistics: $statistics
      .get()
      .map((statistic) => $(statistic).text().replace(/ {2,}/g, ' ').trim()),
    topics: $topics.get().map((topic) => $(topic).text().trim()),
  };
}
