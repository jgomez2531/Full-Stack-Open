import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
    },
    button: {
      padding: 20,
      paddingLeft: 40,
      paddingRight: 40,
      margin: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(0, 104, 225)',
      borderRadius: 10,
    },
});
  
const RepositoryInfo = () => {

    const { id } = useParams();
  
    const { repository } = useRepository({ id });
    if (!repository) return null;

    console.log(repository);

    return (
        <View style={styles.container}>
            <RepositoryItem item={repository} />
            <Pressable
                style={styles.button}
                onPress={() => Linking.openURL(repository.url)}
            >
                <Text color="white">Open in Github</Text>
            </Pressable>
        </View>
    );
};

export default RepositoryInfo;