const graphql = require("graphql");
const _ = require("lodash");

let books = [
  { id: "1", name: "Name1", genre: "A", authorID: "2" },
  { id: "2", name: "Name2", genre: "b", authorID: "2" },
  { id: "3", name: "Name3", genre: "c", authorID: "2" },
  { id: "4", name: "Name4", genre: "A", authorID: "1" },
  { id: "5", name: "Name5", genre: "b", authorID: "3" },
  { id: "6", name: "Name6", genre: "A", authorID: "3" }
];
let authors = [
  { id: "1", name: "Name1", age: 44, books: [4] },
  { id: "2", name: "Name2", age: 55, books: [1, 2, 3] },
  { id: "3", name: "Name3", age: 66, books: [5, 6] }
];

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parents, args) {
        console.log(parents);
        return _.find(authors, { id: parents.authorID });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorID: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
