import get from "lodash.get";
import { matchString, getYear } from "../utils";

const getFilteredData = (data, filters) => {
  const { keywords, launchPad, minYear, maxYear } = filters;
  debugger;
  const filteredData = data
    .filter(launch => {
      const flightNumber = get(launch, "flightNumber");
      const rocketName = get(launch, "rocket.rocketName");
      const payloadId = get(launch, "payloads[0].payloadId");

      return (
        keywords === "" ||
        flightNumber === keywords ||
        matchString(keywords, rocketName) ||
        matchString(keywords, payloadId)
      );
    })
    .filter(launch => {
      const launchSiteId = get(launch, "launchSite.siteId");
      const { value } = launchPad;
      return value === "*" || launchSiteId === value;
    })
    .filter(launch => {
      const launchYear = getYear(get(launch, "launchDateLocal"));
      const minYearVal = minYear.value;
      const maxYearVal = maxYear.value;
      return (
        (minYearVal === "*" || minYearVal >= launchYear) &&
        (maxYearVal === "*" || maxYearVal <= launchYear)
      );
    });

  return filteredData;
};

export default getFilteredData;
