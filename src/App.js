import React, { Component } from "react";
import "./App.css";

import Header from "./shared/components/Header";
import { connect } from "react-redux";
import { fetchJobs } from "./redux/job/action";
import Pagination from "./shared/components/pagination";
import FilterBar from "./shared/components/filterbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.handlerFilterResult = this.handlerFilterResult.bind(this);
  }

  componentDidMount() {
    this.props.fetchJobs();
  }

  onPageChanged({ currentPage }) {
    console.log(currentPage);
  }

  handlerFilterResult({ query }) {
    this.props.fetchJobs(query);
  }

  render() {
    return (
      <div className="App">
        <div className="App-Wrapper">
          <Header />
          <FilterBar handlerFilterResult={this.handlerFilterResult} />
          {this.props.total !== 0 ? (
            <Pagination
              totalRecords={this.props.total}
              pageLimit={12}
              onPageChanged={this.onPageChanged}
            />
          ) : null}
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
