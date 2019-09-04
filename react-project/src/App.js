import React, { Component } from "react";

import "./assets/styles/base.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Launches from "./components/Launches";
import { getLaunchDetails } from "./utils";
/**
 * Base component for the application
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launches: null,
      launchPads: null,
      isLoading: true
    };
  }
  async componentDidMount() {
    const { launches, launchPads } = await getLaunchDetails();
    this.setState({
      launches,
      launchPads,
      isLoading: false
    });
  }
  /**
   * The header component contains a scroll down button that when clicked
   * should scroll the page down to where the main content starts
   */

  scroll = () => {
    const header = document.getElementsByTagName("header")[0];
    const headerHeight = header.offsetHeight;
    window.scrollTo(0, headerHeight);
  };
  handleScrollClick = () => {
    this.scroll();
  };

  /**
   * The footer contains a back to top button that should scrool
   * the page back up to where the results start
   */
  handleBackToTopClick = () => {
    this.scroll();
  };

  render() {
    const { launches, launchPads } = this.state;
    return (
      launches && (
        <div className="App">
          <Header onScrollClick={this.handleScrollClick} />
          <main>
            <Launches launches={launches} launchPadData={launchPads} />
          </main>
          <Footer onBackToTopClick={this.handleBackToTopClick} />
        </div>
      )
    );
  }
}

export default App;
