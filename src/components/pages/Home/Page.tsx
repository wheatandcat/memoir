import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Page = () => {
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inner}>
          <View>
            <Text>2020</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  root: {},
  inner: {
    height: '100%',
  },
});
