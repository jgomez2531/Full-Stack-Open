import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const [authorize, result] = useMutation(AUTHORIZE);
  
    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments and return this function isntead of the mutation directly
        const res = await authorize({
          variables: { credentials: { username, password } },
        });
        await authStorage.setAccessToken(res.data.authorize.accessToken);
        await apolloClient.resetStore();
        //return result;
        return res;
    };
  
    return [signIn, result];
  };

  export default useSignIn;