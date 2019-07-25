import React, { Component } from "react";
import "./index.css";
import SearchIcon from "../../../assets/images/magnifying-glass.png";
import PropTypes from "prop-types";

export default class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput(e) {
    this.setState({ query: e.target.value });
  }

  render() {
    const { handlerFilterResult } = this.props;
    const { query } = this.state;
    return (
      <form
        className="filterbar"
        onSubmit={event => {
          event.preventDefault();
          handlerFilterResult({ query: query });
        }}
      >
        <div className="filterbar__input__wrapper">
          <img src={SearchIcon} alt="searchIcon" width={16} />
          <input
            placeholder="Search for job title or company name"
            onChange={this.handleChangeInput}
          />
        </div>
        <button className="filter_button" type="submit">
          Filter results
        </button>
      </form>
    );
  }
}

FilterBar.propTypes = {
  handlerFilterResult: PropTypes.func.isRequired
};
