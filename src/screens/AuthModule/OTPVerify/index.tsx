import SafeContainer from '@components/Layout/SafeContainer';
import { COLORS } from '@config/theme';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { FooterSection } from '@components/AuthModule/OTPVerify/FooterSection';
import { HeaderSection } from '@components/AuthModule/OTPVerify/HeaderSection';
import { LogoSection } from '@components/AuthModule/OTPVerify/LogoSection';
import OtpScreen from '@components/AuthModule/OTPVerify/OtpInputSection';
import { styles } from './style';

const OTPVerify = () => {
  const route = useRoute<any>();
  const { phoneNumber } = route?.params || { phoneNumber: '' };

  return (
    <SafeContainer style={{ backgroundColor: COLORS.primary }}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <LogoSection />
          <View style={styles.card}>
            <HeaderSection />
            <OtpScreen phoneNumber={phoneNumber} />
          </View>
          <FooterSection />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeContainer>
  );
};

export default OTPVerify;
