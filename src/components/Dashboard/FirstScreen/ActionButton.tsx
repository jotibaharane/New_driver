import Icon from '@react-native-vector-icons/material-design-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
export const ActionButton = ({ action, onPress }: any) => (
  <TouchableOpacity style={styles.actionButton} onPress={() => onPress(action)}>
    <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
      <Icon name={action.icon} size={24} color="white" />
    </View>
    <Text style={styles.actionLabel}>{action.label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  actionButton: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionLabel: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
});
