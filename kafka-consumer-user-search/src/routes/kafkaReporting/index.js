const { Router } = require('express');
const { AgeGroup, Country } = require('../../models');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const ageGroupReports = await AgeGroup.find({}).lean().exec();
    const countryReports = await Country.find({}).lean().exec();

  	return res.send({ ageGroupReports, countryReports });
  } catch (error) {
    console.log('Error in /kafka-reporting', { error });

    return res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
