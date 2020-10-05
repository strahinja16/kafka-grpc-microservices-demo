const { AgeGroup, Country } = require('../../../models');
const { kafkaConfig } = require('../../../config');
const { getAgeGroupNameByAge } = require('./util');

const { topicUserSearch } = kafkaConfig;

const storeAgeDataToMongo = async (userSearch, io) => {
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

    io.emit('ageGroupReports', newAgeGroupRecord);
    return;
  }

  const updatableAgeGroup = await AgeGroup.findOneAndUpdate(
    {
      ageGroup,
      category,
    },
    {
      $inc: { searchCount: 1 },
    },
    {
      lean: true,
    },
  );

  const updatedAgeGroup = {
    ...updatableAgeGroup,
    searchCount: updatableAgeGroup.searchCount + 1,
  };

  io.emit('ageGroupReports', updatedAgeGroup);
};

const storeCountryDataToMongo = async (userSearch, io) => {
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

    io.emit('countryReports', newCountryRecord);
    return;
  }
  
  const updatableCountryRecord = await Country.findOneAndUpdate(
    {
      country,
      category,
    },
    {
      $inc: { searchCount: 1 },
    },
    {
      lean: true,
    },
  );
  
  const updatedCountryRecord = {
    ...updatableCountryRecord,
    searchCount: updatableCountryRecord.searchCount + 1,
  };
  
  io.emit('countryReports', updatedCountryRecord);
};

const processTopicUserSearch = (consumer, io) => {
  try {
    consumer.on('message', async ({ topic, value }) => {
      if (topic !== topicUserSearch) return;

      const userSearch = JSON.parse(value);

      await storeAgeDataToMongo(userSearch, io);
      await storeCountryDataToMongo(userSearch, io);
    });

    consumer.on('error', err => console.log(`${topicUserSearch} processing on error: ${err.message}`));
  } catch (err) {
    console.log(`${topicUserSearch} processing on error: ${err.message}`);
  }
};

module.exports = {
  processTopicUserSearch,
};
