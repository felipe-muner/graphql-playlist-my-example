import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

const addBookMutation = gql`
  mutation {
    addBook(name: "", genre: "", authorID: "") {
      id
      name
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation };
