const { Router } = require('express');
const { GlobalNewsMetrics, ArticleCountByCategory, NewspaperArticleCountByCategory } = require('../../models');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const globalReports = await GlobalNewsMetrics.find({}).lean().exec();
    const articleCountByCategoryReports = await ArticleCountByCategory.find({}).lean().exec();
    const newspaperArticleCountByCategoryReports = await NewspaperArticleCountByCategory.find({})
      .lean()
      .exec();
    
  	return res.send({
      globalReports,
      articleCountByCategoryReports,
      newspaperArticleCountByCategoryReports,
  	});
  } catch (error) {
    console.log('Error in /kafka-reporting', { error });

    return res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
