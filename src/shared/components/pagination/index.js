/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.css";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 12 } = props;

    this.pageLimit = pageLimit;
    this.totalRecords = totalRecords;

    this.pageNeighbours = 1;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = page => {
    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    this.setState({ currentPage });
  };

  handleClick = (page, evt) => {
    const { onPageChanged } = this.props;
    evt.preventDefault();
    onPageChanged({ currentPage: page });
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    const { onPageChanged } = this.props;
    const page = this.state.currentPage - this.pageNeighbours * 2 - 1;

    evt.preventDefault();
    onPageChanged({ currentPage: page });
    this.gotoPage(page);
  };

  handleMoveRight = evt => {
    const { onPageChanged } = this.props;
    const page = this.state.currentPage + this.pageNeighbours * 2 + 1;

    evt.preventDefault();
    onPageChanged({ currentPage: page });
    this.gotoPage(page);
  };

  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <ul className="pagination">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={this.handleMoveLeft}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
            );

          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={this.handleMoveRight}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            );

          return (
            <li
              key={index}
              className={`page-item${currentPage === page ? " active" : ""}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={e => this.handleClick(page, e)}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;
