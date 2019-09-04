import React from "react";
import get from "lodash.get";
import LaunchFilter from "../LaunchFilter";
import LaunchItem from "../LaunchItem";

import styles from "./launches.module.scss";

import {
  getFormattedTime,
  getMissionStatus,
  getLaunchPads,
  getYears,
  getFilteredData
} from "../../utils";

/**
 * Launches component responsible for showing the filter component,
 * handling the fetching and filtering of the launch data and rendering
 * the launches that match the selected filters
 */
class Launches extends React.Component {
  constructor(props) {
    super(props);
    const { launches } = props;
    this.state = {
      isLoading: false,
      error: null,
      launches,
      filter: {
        minYear: null,
        maxYear: null,
        keywords: null,
        launchPad: null
      }
    };
  }

  handleFilterChange = filters => {
    const { launches } = this.state;
    const data = getFilteredData(launches, filters);
    console.log("data", data);
  };

  /**
   * Responsible for transforming the data from the launch and launchpad api's
   * into a usable and consistent format for the LaunchItem component
   */
  _launchDataTransform = (launchResp, launchPads) => {
    const resultObj = {
      rocketName: get(launchResp, "rocket.rocketName"),
      payloadId: get(launchResp, "payloads[0].payloadId"),
      launchDate: getFormattedTime(get(launchResp, "launchDateLocal")),
      launchSiteName: get(launchResp, "launchSite.siteName"),
      flightNumber: get(launchResp, "flightNumber"),
      missionFailed: getMissionStatus(
        get(launchResp, "launchSuccess"),
        get(launchResp, "landSuccess")
      ),
      missionPatchLink: get(launchResp, "links.missionPatch"),
      redditCampaignLink: get(launchResp, "links.redditCampaign"),
      redditLaunchLink: get(launchResp, "links.redditLaunch"),
      redditMediaLink: get(launchResp, "links.redditMedia"),
      pressKitLink: get(launchResp, "links.presskit"),
      articleLink: get(launchResp, "links.articleLink"),
      videoLink: get(launchResp, "links.videoLink")
    };

    return resultObj;
  };

  _renderLaunches = () => {
    const { launches } = this.state;

    const { launchPadData } = this.props;

    const launchFilter = () => {
      // do something with the filter obj
      return true;
    };

    const filteredLaunches = launches
      .map(l => this._launchDataTransform(l, launchPadData))
      .filter(launchFilter);
    // array key or flight number
    return filteredLaunches.map(l => (
      <LaunchItem key={l.flightNumber} {...l} />
    ));
  };

  render() {
    const { launchPadData, launches } = this.props;
    const launchPad = getLaunchPads(launchPadData);
    const totalResults = this.state.launches.length;
    const years = getYears(launches);

    return (
      <section className={`${styles.launches} layout-l`}>
        <LaunchFilter
          onFilterChange={this.handleFilterChange}
          launchPad={launchPad}
          years={years}
        />
        <div className={styles.summary}>
          <p>Showing {totalResults} Missions</p>
        </div>
        {this._renderLaunches()}

        {/* 
            Example launch items, you should remove these once you have
            implemented the rendering logic 
        */}
      </section>
    );
  }
}

export default Launches;
