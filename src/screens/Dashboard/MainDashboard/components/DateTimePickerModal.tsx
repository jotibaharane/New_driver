import { memo, useCallback, useMemo, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';

// Memoized DateTime Picker Component (same as before)
export const DateTimePickerModal = memo(
  ({
    open,
    setOpen,
    onSelect,
  }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSelect: (time: string) => void;
  }) => {
    const [date, setDate] = useState(new Date());
    const [tempDate, setTempDate] = useState(date);

    const handleConfirm = useCallback(() => {
      setDate(tempDate);
      const formatted = tempDate.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      onSelect(formatted);

      setOpen(false);
    }, [tempDate, setDate, onSelect, setOpen]);

    const timeOptions = useMemo(
      () =>
        Array.from({ length: 24 }, (_, i) => {
          const hour = i % 12 || 12;
          const ampm = i < 12 ? 'AM' : 'PM';
          return { hour: i, label: `${hour}:00 ${ampm}` };
        }),
      [],
    );

    return (
      <Modal visible={open} transparent={true} animationType="slide">
        <View style={styles.datePickerModal}>
          <View style={styles.datePickerContainer}>
            <View style={styles.datePickerHeader}>
              <Text style={styles.datePickerTitle}>Select Reporting Time</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateTimeContainer}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateSectionTitle}>Date</Text>
                <View style={styles.dateRow}>
                  {[0, 1, 2].map(days => {
                    const newDate = new Date();
                    newDate.setDate(newDate.getDate() + days);
                    const isSelected =
                      tempDate.getDate() === newDate.getDate() &&
                      tempDate.getMonth() === newDate.getMonth() &&
                      tempDate.getFullYear() === newDate.getFullYear();

                    return (
                      <TouchableOpacity
                        key={days}
                        style={[
                          styles.dateOption,
                          isSelected && styles.dateOptionSelected,
                        ]}
                        onPress={() => setTempDate(newDate)}
                      >
                        <Text
                          style={[
                            styles.dateOptionText,
                            isSelected && styles.dateOptionTextSelected,
                          ]}
                        >
                          {days === 0
                            ? 'Today'
                            : days === 1
                            ? 'Tomorrow'
                            : newDate.toLocaleDateString('en-US', {
                                weekday: 'short',
                              })}
                        </Text>
                        <Text
                          style={[
                            styles.dateOptionDay,
                            isSelected && styles.dateOptionDaySelected,
                          ]}
                        >
                          {newDate.getDate()}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View style={styles.timeContainer}>
                <Text style={styles.dateSectionTitle}>Time</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.timeOptions}>
                    {timeOptions.map(({ hour, label }) => {
                      const timeDate = new Date(tempDate);
                      timeDate.setHours(hour, 0, 0, 0);
                      const isSelected =
                        tempDate.getHours() === hour &&
                        tempDate.getMinutes() === 0;

                      return (
                        <TouchableOpacity
                          key={hour}
                          style={[
                            styles.timeOption,
                            isSelected && styles.timeOptionSelected,
                          ]}
                          onPress={() => setTempDate(timeDate)}
                        >
                          <Text
                            style={[
                              styles.timeOptionText,
                              isSelected && styles.timeOptionTextSelected,
                            ]}
                          >
                            {label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  datePickerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '90%',
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  datePickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  dateTimeContainer: {
    marginVertical: 12,
  },
  dateContainer: {
    marginBottom: 16,
  },
  dateSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  dateOptionSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  dateOptionText: {
    fontSize: 13,
    color: '#374151',
  },
  dateOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  dateOptionDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  dateOptionDaySelected: {
    color: 'white',
  },
  timeContainer: {
    marginTop: 8,
  },
  timeOptions: {
    flexDirection: 'row',
  },
  timeOption: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  timeOptionSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  timeOptionText: {
    fontSize: 13,
    color: '#374151',
  },
  timeOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});
