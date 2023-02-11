import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from "./pages/home/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Detail from "./pages/detail/detail";
import Favourite from "./pages/favourite/favourite";

export default function App() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:id",
      element: <Detail />
    },
    {
      path: "/favourite",
      element: <Favourite />
    },
  ]);

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
