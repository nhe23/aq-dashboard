import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";

const headers = {'content-type': 'application/json'};
const getHeaders = () => {
  return headers;
};

const cache = new InMemoryCache();

// const wsLink = new WebSocketLink({
//   uri: "ws://localhost:8080/v1/graphql",
//   options: {
//     reconnect: true,
//     lazy: true,
//     connectionParams: () => {
//       return { headers: getHeaders() };
//     },
//   },
// });

const httpLink = new HttpLink({
  uri: "http://localhost:8080/query",
  headers: getHeaders()
});

const link = split(
  ({ query }) => {
    const { kind } = getMainDefinition(query);
    return kind === "OperationDefinition";
  },
  // wsLink,
  httpLink
);

export const client = new ApolloClient({
  link,
  cache
});
