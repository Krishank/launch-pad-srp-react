import React from "react";
import PropTypes from "prop-types";
import get from "lodash.get";
import Select from "../Select";
import TextInput from "../TextInput";
import Button, { TYPES as BUTTON_TYPES } from "../Button";
import styles from "./launch-filter.module.scss";
import { locale, commonErrors } from "../../locale";

// Example static option value
// the real options will need to come from the api
const options = [{ value: "*", label: "Any" }];

/**
 * Launch filter holds the filter state and writes the changes to the filters
 * back up to the parent element on click of the apply button
 */
class LaunchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
      launchPad: options[0],
      minYear: options[0],
      maxYear: options[0]
    };
  }
  // some change handlers ready for you
  handleKeywordChange = () => {};
  handleLaunchPadChange = () => {
    // this.setState({});
  };
  handleMinYearChange = () => {};
  handleMaxYearChange = () => {};

  // and example change handler for a <Select /> element
  validateYear = (minYear, maxYear) => {
    const { minMaxYearError } = commonErrors.errors;
    if (minYear > maxYear) {
      alert(`${minMaxYearError} minYera: ${minYear} and maxYear:${maxYear}`);
      throw new Error(
        `${minMaxYearError} minYera: ${minYear} and maxYear:${maxYear}`
      );
    }
  };
  handleChange = (selectedOption, type) => {
    switch (type) {
      case "launchPad":
        this.setState({ launchPad: selectedOption });
        break;
      case "minYear":
        this.setState({ minYear: selectedOption });
        break;
      case "maxYear":
        this.setState({ maxYear: selectedOption });
        break;

      default:
        break;
    }
  };

  // an example change handler for a <TextInput /> element
  handleInputChange = (value, type) => {
    this.setState({ keywords: value });
  };

  // handler for calling the filter update
  handleFilterUpdate = () => {
    const { keywords, launchPad, minYear, maxYear } = this.state;
    const { onFilterChange } = this.props;
    onFilterChange({ keywords, launchPad, minYear, maxYear });
  };

  render() {
    const { keywords, minYear, maxYear, launchPad } = this.state;
    let { years } = this.props;
    years = [...options, ...years];
    let launchPadOptions = [...options, ...this.props.launchPad];

    const { keyWordsPlaceholderTxt } = get(locale, "launchFiltersStaticTxt");
    const { keyWordsTxt, launchPadsSelect, minYearSelect, maxYearSelect } = get(
      locale,
      "launchFiltersStaticTxt.accessibilityText"
    );
    return (
      <section className={styles.launchFilter}>
        <TextInput
          placeholder={keyWordsPlaceholderTxt}
          label={keyWordsTxt}
          value={keywords}
          onChange={value => this.handleInputChange(value, "keywords")}
          uid="keywords-text-input"
        />
        <Select
          label={launchPadsSelect}
          value={launchPad}
          onChange={selectedOption =>
            this.handleChange(selectedOption, "launchPad")
          }
          options={launchPadOptions}
          uid="launch-pads-select"
        />
        <Select
          label={minYearSelect}
          value={minYear}
          onChange={selectedOption =>
            this.handleChange(selectedOption, "minYear")
          }
          options={years}
          filterType="minYear"
          uid="min-years-select"
        />
        <Select
          label={maxYearSelect}
          value={maxYear}
          onChange={selectedOption =>
            this.handleChange(selectedOption, "maxYear")
          }
          options={years}
          filterType="maxYear"
          uid="max-years-select"
        />
        <Button onClick={this.handleFilterUpdate} type={BUTTON_TYPES.PRIMARY}>
          Apply
        </Button>
      </section>
    );
  }
}

LaunchFilter.propTypes = {
  // used to let parent component know about changes
  // to the filters
  onFilterChange: PropTypes.func
};

LaunchFilter.defaultProps = {
  onFilterChange: () => {}
};

export default LaunchFilter;
