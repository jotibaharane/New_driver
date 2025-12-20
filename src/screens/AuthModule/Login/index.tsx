import { FooterSection } from '@components/AuthModule/Login/FooterSection';
import { HeaderSection } from '@components/AuthModule/Login/HeaderSection';
import { LogoSection } from '@components/AuthModule/Login/LogoSection';
import { PhoneInputSection } from '@components/AuthModule/Login/PhoneInputSection';
import SafeContainer from '@components/Layout/SafeContainer';
import { COLORS } from '@config/theme';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { styles } from './style';

const MobileNumberScreen = () => {
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
            <PhoneInputSection />
          </View>
          <FooterSection />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeContainer>
  );
};

export default MobileNumberScreen;
