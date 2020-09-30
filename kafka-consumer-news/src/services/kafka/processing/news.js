const { kafkaConfig } = require('../../../config');
const {
  GlobalNewsMetrics,
  ArticleCountByCategory,
  NewspaperArticleCountByCategory,
} = require('../../../models');

const { topicNews } = kafkaConfig;

const storeGlobalMetricsToMongo = async () => {
  await GlobalNewsMetrics.findOneAndUpdate(
    {
      id: 1,
    },
    {
      $inc: { articlesCount: 1 },
    },
    {
      upsert: true,
      new: true,
    },
  );
};

const storeNewspaperDataToMongo = async (news) => {
  const { newspaper, category } = news;

  await ArticleCountByCategory.findOneAndUpdate(
    {
      category,
    },
    {
      $inc: { articlesCount: 1 },
    },
    {
      upsert: true,
      new: true,
    },
  );

  await NewspaperArticleCountByCategory.findOneAndUpdate(
    {
      newspaper,
      category,
    },
    {
      $inc: { articlesCount: 1 },
    },
    {
      upsert: true,
      new: true,
    },
  );
};

const processTopicNews = (consumer) => {
  try {
    consumer.on('message', async ({ topic, value }) => {
      if (topic !== topicNews) return;

      const news = JSON.parse(value);
      await storeGlobalMetricsToMongo(news);
      await storeNewspaperDataToMongo(news);
    });

    consumer.on('error', err => console.log(`${topicNews} processing on error: ${err.message}`));
  } catch (err) {
    console.log(`${topicNews} processing on error: ${err.message}`);
  }
};

module.exports = {
  processTopicNews,
};
