import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import theme from '../theme';
import Text from './Text';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: theme.colors.repoItem,
    width: windowWidth,
  },
  flexTop: {
    flexDirection:'row',
    width: '95%',
  },
  flexTopRight: {
    paddingLeft: 20,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  flexBottom: {
    paddingLeft: 30,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  flexBottomItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPic: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  langTag: {
    marginTop: 5,
    padding: 4,
    borderRadius: 5,
  },

});

const RepositoryItem = ({item}) => {

  const formatNumber = (number) => {
    return number > 1000 ? Math.round((number / 1000) * 10) / 10 + "k" : number;
  };
  
  return (
    <View testID="repositoryItem" style={styles.container}>

      <View style={styles.flexTop}>
        <Image
          style={styles.avatarPic}
          source={{uri: item.ownerAvatarUrl}}
        />
        <View style={styles.flexTopRight}>
          <Text fontWeight='bold'>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text color='white' backgroundColor='primary' style={styles.langTag}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.flexBottom}>
        <View style={styles.flexBottomItem}>
          <Text fontWeight='bold'>{formatNumber(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.flexBottomItem}>
          <Text fontWeight='bold'>{formatNumber(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.flexBottomItem}>
          <Text fontWeight='bold'>{formatNumber(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.flexBottomItem}>
          <Text fontWeight='bold'>{formatNumber(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      
    </View>
  );
};

export default RepositoryItem;