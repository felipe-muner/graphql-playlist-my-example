import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  displayBooks() {
    let data = this.props.data;
    if (data.loading) {
      return <div> Loading books...</div>;
    } else {
      return data.books.map(b => {
        return (
          <li
            key={b.id}
            onClick={e => {
              this.setState({ selected: b.id });
            }}
          >
            {b.name}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <div id="book-list">
          <ul>{this.displayBooks()}</ul>
        </div>
        <div id="book-details">
          <BookDetails bookID={this.state.selected} />
        </div>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
