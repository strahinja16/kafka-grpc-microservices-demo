const { AgeGroup, Country } = require('../../../models');
const { kafkaConfig } = require('../../../config');
const { getAgeGroupNameByAge } = require('./util');

const { topicUserSearch } = kafkaConfig;

const storeAgeDataToMongo = async (userSearch) => {
  const { category, user } = userSearch;
  const { age } = user;

  const ageGroup = getAgeGroupNameByAge(age);

  const ageGroupRecord = await AgeGroup.findOne({ ageGroup, category });
  if (!ageGroupRecord) {
    const newAgeGroupRecord = new AgeGroup({
      ageGroup,
      category,
      searchCount: 1,
    });

    await newAgeGroupRecord.save();
    return;
  }

  await AgeGroup.update(
    {
      ageGroup,
      category,
    },
    {
      $inc: { searchCount: 1 },
    },
  );
};

const storeCountryDataToMongo = async (userSearch) => {
  const { category, user } = userSearch;
  const { country } = user;

  const countryRecord = await Country.findOne({ country, category });
  if (!countryRecord) {
    const newCountryRecord = new Country({
      country,
      category,
      searchCount: 1,
    });

    await newCountryRecord.save();
    return;
  }

  await Country.update(
    {
      country,
      category,
    },
    {
      $inc: { searchCount: 1 },
    },
  );
};

const processTopicUserSearch = (consumer) => {
  try {
    consumer.on('message', async ({ topic, value }) => {
      if (topic !== topicUserSearch) return;

      const userSearch = JSON.parse(value);
      await storeAgeDataToMongo(userSearch);
      await storeCountryDataToMongo(userSearch);
    });

    consumer.on('error', err => console.log(`${topicUserSearch} processing on error: ${err.message}`));
  } catch (err) {
    console.log(`${topicUserSearch} processing on error: ${err.message}`);
  }
};

module.exports = {
  processTopicUserSearch,
};
