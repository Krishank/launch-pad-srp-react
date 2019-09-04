import React from "react";
import PropTypes from "prop-types";
import { locale } from "../../locale";
import styles from "./launch-item.module.scss";

/**
 * Launch Item renders all the details of a
 * given launch
 */
const LaunchItem = ({
  rocketName,
  payloadId,
  launchDate,
  launchSiteName,
  flightNumber,
  missionFailed,
  missionPatchLink,
  redditCampaignLink,
  redditLaunchLink,
  redditMediaLink,
  pressKitLink,
  articleLink,
  videoLink
}) => {
  const {
    launchedTxt,
    launchedFromTxt,
    flightNumberTxt,
    redditCampaignTxt,
    redditLaunchTxt,
    redditMediaTxt,
    pressKitTxt,
    articletxt,
    watchVideoTxt
  } = locale.launchListingPageStaticTxt;
  return (
    <article className={styles.launchItem}>
      <div className={styles.patchContainer}>
        <img
          className={styles.patch}
          alt="Mission patch"
          src={missionPatchLink}
        />
      </div>
      <div className={styles.detailsContainer}>
        <p className={styles.title}>
          {rocketName} - {payloadId} {missionFailed && `-  `}
          <span className={styles.failed}>{missionFailed}</span>
        </p>
        <p className={styles.subtitle}>
          {launchedTxt} <strong>{launchDate}</strong> {launchedFromTxt}{" "}
          <strong>{launchSiteName}</strong>
        </p>
        <div className={styles.links}>
          {redditCampaignLink && (
            <a
              href="."
              target="_blank"
              rel="noreferrer noopener"
              className={styles.link}
            >
              {redditCampaignTxt}
            </a>
          )}
          {redditLaunchLink && (
            <a
              href="."
              target="_blank"
              rel="noreferrer noopener"
              className={styles.link}
            >
              {redditLaunchTxt}
            </a>
          )}
          {redditMediaTxt && (
            <a
              href={redditMediaTxt}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.link}
            >
              {redditMediaTxt}
            </a>
          )}
          {pressKitLink && (
            <a
              href={pressKitLink}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.link}
            >
              {pressKitTxt}
            </a>
          )}
          {articleLink && (
            <a
              href={articleLink}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.link}
            >
              {articletxt}
            </a>
          )}
          {videoLink && (
            <a
              href={videoLink}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.link}
            >
              {watchVideoTxt}
            </a>
          )}
        </div>
      </div>
      <dl className={styles.flightNumber}>
        <dt>{flightNumberTxt}</dt>
        <dd>#{flightNumber}</dd>
      </dl>
    </article>
  );
};

LaunchItem.propTypes = {
  // name of the rocket used
  rocketName: PropTypes.string.isRequired,

  // payload id of rocket
  payloadId: PropTypes.string.isRequired,

  // the date of launch
  launchDate: PropTypes.string.isRequired,

  // the launch pad the mission launched from
  launchSiteName: PropTypes.string.isRequired,

  // flight number of the rocket
  flightNumber: PropTypes.number.isRequired,

  // whether the mission failed or not defined,
  // as when the launch or landing was not successful
  missionFailed: PropTypes.string.isRequired,

  // link to the mission patch image
  missionPatchLink: PropTypes.string,

  // link to the reddit campaign
  redditCampaignLink: PropTypes.string,

  // link to the reddit launch thread
  redditLaunchLink: PropTypes.string,

  // link to the reddit media thread
  redditMediaLink: PropTypes.string,

  // link to the press kit page
  pressKitLink: PropTypes.string,

  // link to the launch article page
  articleLink: PropTypes.string,

  // link to video of the mission
  videoLink: PropTypes.string.isRequired
};

LaunchItem.defaultProps = {
  missionPatchLink:
    "http://spacexpatchlist.space/images/thumbs/falcon_1_flight_1.png",
  pressKitLink: null,
  articleLink: null,
  videoLink: null,
  redditLaunchLink: null,
  redditCampaignLink: null,
  redditMediaTxt: null
};
export default LaunchItem;
