import { memo } from 'react';

const DateTimePickerModal = memo(
  ({
    open,
    setOpen,
    date,
    setDate,
    setReportingTime,
    errors,
    setErrors,
  }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    date: Date;
    setDate: (date: Date) => void;
    setReportingTime: (time: string) => void;
    errors: Errors;
    setErrors: (errors: Errors) => void;
  }) => {
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
      setReportingTime(formatted);

      setOpen(false);
    }, [tempDate, setDate, setReportingTime, setErrors, setOpen]);

    const handleCancel = useCallback(() => {
      setOpen(false);
    }, [setOpen]);

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
              <TouchableOpacity onPress={handleCancel}>
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
