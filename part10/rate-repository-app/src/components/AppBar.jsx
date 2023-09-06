import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useHistory } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import { AUTHORIZED_USER } from "../graphql/queries";


const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    //paddingTop: Constants.statusBarHeight,
    padding: 30,
    backgroundColor: theme.colors.appBar,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  // text: {
  //   color: 'white',
  //   fontSize: 15,
  //   fontWeight: '700',
  // }
});

const AppBar = () => {
  const { data, loading } = useQuery(AUTHORIZED_USER);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const history = useHistory();

  if (loading) return null;
  const { authorizedUser: user } = data;
  console.log(user);

  const signOut = async () => {
    console.log('signout reached');
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    history.push("/signin");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {/* <AppBarTab title='Repositories' link='' />
        <AppBarTab title='Sign In' link='/signin' /> */}

        {<AppBarTab title='Repositories' link='/' />}
        {!user && <AppBarTab title='Sign In' link='/signin' />}
        {user && <AppBarTab title="Sign Out" handler={signOut} />}
      </ScrollView>
    </View>      
  );
};

export default AppBar;