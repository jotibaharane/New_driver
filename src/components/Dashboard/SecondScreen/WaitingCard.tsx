import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const WaitingCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ActivityIndicator size="small" />
        <Text style={styles.title}>Waiting for Vehicle Data Sheet</Text>
        <Text style={styles.subtitle}>
          Please wait while we fetch the latest vehicle details.
        </Text>
      </View>
    </View>
  );
};

export default WaitingCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F7FB',
  },
  card: {
    width: '85%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    alignItems: 'center',

    // Android shadow
    elevation: 4,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  title: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});
