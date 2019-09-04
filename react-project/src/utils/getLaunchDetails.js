import { camelizeKeys } from "humps";

// Use env for host I could use promise.all as well
const getLauncheDetails = async () => {
  const fetchLaunches = await fetch(`http://localhost:8001/launches`, {});
  const fetchLaunchpads = await fetch(`http://localhost:8001/launchpads`, {});
  const launches = await fetchLaunches.json();
  const launchPads = await fetchLaunchpads.json();
  return {
    launches: camelizeKeys(launches),
    launchPads: camelizeKeys(launchPads)
  };
};

export default getLauncheDetails;
