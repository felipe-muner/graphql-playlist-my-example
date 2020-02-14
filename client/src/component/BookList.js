import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

class BookList extends Component {
  displayBooks() {
    let data = this.props.data;
    if (data.loading) {
      return <div> Loading books...</div>;
    } else {
      return data.books.map(b => {
        return <li key={b.id}>{b.name}</li>;
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div id="book-list">
        <ul>{this.displayBooks()}</ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
