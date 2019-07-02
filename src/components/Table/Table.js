import React, { Component } from "react";
import PropTypes from "prop-types";

import { SORTS } from "../../constants";
import Row from "./Row";
import Sort from "./Sort";
import "./Table.css";

export class Table extends Component {
  state = {
    sortKey: "NONE",
    isSortReverse: false
  };

  onSort = sortKey => {
    // func used here to avoid getting stale state
    this.setState(prevState => {
      const isSortReverse =
        prevState.sortKey === sortKey && !prevState.isSortReverse;
      return { sortKey, isSortReverse };
    });
  };

  render() {
    const { list, onDismiss } = this.props;
    const { sortKey, isSortReverse } = this.state;
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
    return (
      <div className="table">
        <div className="table-header">
          <span className="largeColumn ">
            <Sort
              sortKey={"TITLE"}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
            >
              Title
            </Sort>
          </span>
          <span className="mediumColumn">
            <Sort
              sortKey={"AUTHOR"}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
            >
              Author
            </Sort>
          </span>
          <span className="smallColumn">
            <Sort
              sortKey={"COMMENTS"}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
            >
              Comments
            </Sort>
          </span>
          <span className="smallColumn">
            <Sort
              sortKey={"POINTS"}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
            >
              Points
            </Sort>
          </span>
          <span className="smallColumn">Archive</span>
        </div>
        {reverseSortedList.map(item => {
          return <Row key={item.objectID} item={item} onDismiss={onDismiss} />;
        })}
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    // prevent table from rerendering on every keystroke
    if (
      this.props.list === nextProps.list &&
      this.state.sortKey === nextState.sortKey &&
      this.state.isSortReverse === nextState.isSortReverse
    ) {
      return false;
    }
    return true;
  }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Table;
