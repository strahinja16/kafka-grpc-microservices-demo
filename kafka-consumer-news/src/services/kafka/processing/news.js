const { kafkaConfig } = require('../../../config');
const {
  GlobalNewsMetrics,
  ArticleCountByCategory,
  NewspaperArticleCountByCategory,
} = require('../../../models');

const { topicNews } = kafkaConfig;

const storeGlobalMetricsToMongo = async (io) => {
  const updatableGlobalMetrics = await GlobalNewsMetrics.findOneAndUpdate(
    {
      id: 1,
    },
    {
      $inc: { articlesCount: 1 },
    },
    {
      upsert: true,
      new: true,
      lean: true,
    },
  );

  const updatedGlobalMetrics = {
    ...updatableGlobalMetrics,
    articlesCount: updatableGlobalMetrics.articlesCount + 1,
  };

  io.emit('globalReports', updatedGlobalMetrics);
};

const storeNewspaperDataToMongo = async (news, io) => {
  const { newspaper, category } = news;

  const updatableArticleCountByCategory = await ArticleCountByCategory.findOneAndUpdate(
    {
      category,
    },
    {
      $inc: { articlesCount: 1 },
    },
    {
      upsert: true,
      new: true,
      lean: true,
    },
  );
  const updatedArticleCountByCategory = {
    ...updatableArticleCountByCategory,
    articlesCount: updatableArticleCountByCategory.articlesCount + 1,
  };
  io.emit('articleCountByCategoryReports', updatedArticleCountByCategory);


  const updatableNewspaperArticleCount = await NewspaperArticleCountByCategory.findOneAndUpdate(
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
      lean: true,
    },
  );


  const updatedNewspaperArticleCount = {
    ...updatableNewspaperArticleCount,
    articlesCount: updatableNewspaperArticleCount.articlesCount + 1,
  };

  io.emit('newspaperArticleCountByCategoryReports', updatedNewspaperArticleCount);
};

const processTopicNews = (consumer, io) => {
  try {
    consumer.on('message', async ({ topic, value }) => {
      if (topic !== topicNews) return;

      const news = JSON.parse(value);
      await storeGlobalMetricsToMongo(io);
      await storeNewspaperDataToMongo(news, io);
    });

    consumer.on('error', err => console.log(`${topicNews} processing on error: ${err.message}`));
  } catch (err) {
    console.log(`${topicNews} processing on error: ${err.message}`);
  }
};

module.exports = {
  processTopicNews,
};
