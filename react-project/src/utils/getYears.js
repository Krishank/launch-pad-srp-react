import moment from "moment";

const getYears = launches => {
  let options = launches.reduce((acc, launchPad) => {
    const { launchDateLocal } = launchPad;
    const year = moment(launchDateLocal).format("YYYY");
    const isReplicated = acc.find(item => item.value === year);
    if (!isReplicated) {
      return acc.concat([{ value: year, label: year }]);
    } else {
      return acc;
    }
  }, []);

  return options;
};

export default getYears;
