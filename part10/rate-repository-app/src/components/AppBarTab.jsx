import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
        //paddingLeft: 10,
        paddingRight: 10,
      }
  });

const AppBarTab = ({title, link, handler}) => {
  return (
    <View style={styles.container}>
        <Pressable>
          {(handler != '' && handler != null)
            ? <Link to={link} onPress={()=>handler()}>
                <Text style={styles.text}>{title}</Text>
              </Link>
            : <Link to={link}>
                <Text style={styles.text}>{title}</Text>
              </Link>
          }
        </Pressable>
    </View>
  );
};

export default AppBarTab;