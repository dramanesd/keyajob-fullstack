import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchAllJobs } from "../store/actions/jobs";
import { fetchCategories } from "../store/actions/category";
import JobList from "../containers/JobList";
import CategoryList from "../containers/CategoryList";

class JobTimeline extends Component {
  componentDidMount() {
    this.props.fetchAllJobs();
    this.props.fetchCategories();
  }

  render() {
    const { jobs, categories } = this.props;
    {
      if (jobs.length == 0 && categories.length == 0) {
        return <div className="loading-state">Loading...</div>;
      } else {
        return (
          <div className="container-fluid">
            <div className="row">
              <CategoryList categories={this.props.categories} />
              <JobList jobs={this.props.jobs} />
            </div>
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    jobs: state.jobs,
    currentUser: state.currentUser.user.id,
    categories: state.categories,
  };
}

export default connect(mapStateToProps, { fetchAllJobs, fetchCategories })(
  JobTimeline
);
