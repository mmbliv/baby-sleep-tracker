export const getTheLengthOfDataset = (sleepingData) => {
  let long = 0;
  for (let i of sleepingData) {
    if (i[1].length > long) {
      long = i[1].length;
    }
  }
  return long;
};

const calculateSleepingRange = (sleepingData) => {};
