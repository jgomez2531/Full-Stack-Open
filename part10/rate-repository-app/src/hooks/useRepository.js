import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = ({ id }) => {

  const variables = { id };

  const { data, error, loading, ...result } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  if (loading) return {};

  return { repository: data?.repository, error, loading, ...result };
};

export default useRepository;