import React, { Component } from "react";
import "./App.css";

import Header from "./shared/components/Header";
import { connect } from "react-redux";
import { fetchJobs } from "./redux/job/action";

class App extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  render() {
    return (
      <div className="App">
        <div className="App-Wrapper">
          <Header />
          <div style={{ padding: "10px 20px" }}>
            <p>Please show a list of jobs as per design</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = rootState => {
  return {
    jobs: rootState.job.data,
    total: rootState.job.total,
    current_page: rootState.job.current_page,
    error: rootState.job.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchJobs: (query, page) => dispatch(fetchJobs(query, page))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
