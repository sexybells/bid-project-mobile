import { Image } from 'expo-image';
import {Platform, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import { HelloWave } from '@/src/components/hello-wave';
import ParallaxScrollView from '@/src/components/parallax-scroll-view';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import {Link, router} from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.stepContainer}>
        <TouchableOpacity onPress={() => router.push('/Auth/RegisterScreen')}>
            <Text>Login</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    flex: 1,
      marginTop: 100,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
