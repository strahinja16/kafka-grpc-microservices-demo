
const ageGroups = {
  teen: { mongoId: 1, min: 12, max: 18 },
  'young adults': { mongoId: 2, min: 19, max: 35 },
  'middle aged adults': { mongoId: 3, min: 36, max: 55 },
  old: { mongoId: 4, min: 56, max: Number.MAX_SAFE_INTEGER },
};

const getAgeGroupNameByAge = age => Object.keys(ageGroups)
  .filter((group) => {
    const groupData = ageGroups[group];
    
    return groupData.min <= age && age <= groupData.max;
  })[0];

module.exports = {
  ageGroups,
  getAgeGroupNameByAge,
};
