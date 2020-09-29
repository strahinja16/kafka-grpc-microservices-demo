const userActionsTopic = 'user-actions';
const { UserActions } = require('../../../models');

const storeToMongo = async (key, value) => {
  let update = null;

  switch (key) {
    case 'READ_ARTICLE':
      update = { $inc: { readArticleCount: 1 } };
      break;
    case 'SHARE_ARTICLE':
      update = { $inc: { shareArticleCount: 1 } };
      break;
    case 'SEARCH':
      update = { $inc: { searchCount: 1 } };
      break;
    default:
      update = {};
  }


  await UserActions.findOneAndUpdate(
    {
      id: 1,
    },
    update,
    {
      new: true,
      upsert: true,
    },
  );

  console.log({ key, value: JSON.parse(value) });
};

const processUserActionsTopic = (consumer) => {
  try {
    consumer.on('message', async ({ topic, key, value }) => {
      if (topic !== userActionsTopic) return;

      await storeToMongo(key, value);
    });

    consumer.on('error', err => console.log(`user-action processing on error: ${err.message}`));
  } catch (err) {
    console.log(`user-action processing on error: ${err.message}`);
  }
};

module.exports = {
  processUserActionsTopic,
};
