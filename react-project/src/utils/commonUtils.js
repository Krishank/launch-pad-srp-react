import moment from "moment";

const getFormattedTime = time => {
  return `${moment(time).format("DD MMMM YYYY")} at ${moment(time).format(
    "LT"
  )}`;
};

const getMissionStatus = (launchSuccess, landSuccess) => {
  let missionFailed = "";
  if (launchSuccess === false || landSuccess === false) {
    missionFailed = "Failed Mission";
  }
  return missionFailed;
};

const matchString = (keyword, value) => {
  const regEx = new RegExp(keyword);
  const isMatched = regEx.test(value);
  return isMatched;
};

const getYear = time => moment(time).format("LT");
export { getFormattedTime, getMissionStatus, matchString, getYear };
