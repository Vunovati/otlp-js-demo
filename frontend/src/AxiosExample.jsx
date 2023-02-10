import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";

const queryClient = new QueryClient();

export default function AxiosExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data, isFetching, refetch } = useQuery("repoData", () =>

//    axios.get(
//      "https://api.github.com/repos/tannerlinsley/react-query"
//    ).then((res) => res.data)
      axios.get('http://localhost:3000')
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{JSON.stringify(data.data, null, 2)}</h1>
      <div>{isFetching ? "Updating..." : ""}</div>
      <button
        onClick={() => {
            refetch()
        }}
      >Refetch</button>
    </div>
  );
}
