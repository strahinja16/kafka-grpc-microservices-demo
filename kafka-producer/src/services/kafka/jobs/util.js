
const repeatJob = (job, baseInterval = 500) => {
  const randomInterval = baseInterval * ((Math.random() * 10) + 1);
  setTimeout(job, randomInterval);
};

const categories = ['politics', 'finance', 'sport', 'celebs'];
const countries = ['usa', 'serbia', 'france', 'spain'];
const newspapers = ['guardian', 'times', 'wsJournal', 'newsday'];

module.exports = {
  repeatJob,
  categories,
  countries,
  newspapers,
};
