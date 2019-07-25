import React from "react";
import JobItem from "./JobItem";
import Pagination from "../pagination";
import { connect } from "react-redux";
import { fetchJobs } from "../../../redux/job/action";
import "./index.css";

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  onPageChanged({ currentPage }) {
    const { fetchJobs, query } = this.props;
    fetchJobs(query, currentPage);
  }

  render() {
    const { jobs, totalRecords } = this.props;
    return (
      <div className="jobs">
        <div className="total_jobs">{totalRecords} jobs found</div>
        {jobs.length !== 0
          ? jobs.map((v, i) => {
              return <JobItem key={v.id} item={v} />;
            })
          : null}
        <Pagination
          totalRecords={totalRecords}
          pageLimit={12}
          onPageChanged={this.onPageChanged}
        />
      </div>
    );
  }
}

const mapStateToProps = rootState => {
  return {
    query: rootState.job.query
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
)(Jobs);
