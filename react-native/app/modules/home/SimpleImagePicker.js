import React, { useState } from 'react';
import { View, Text } from 'react-native';

export default function SimpleImagePicker() {

     const STYLES = StyleSheet.create({
        flex: {
          flex: 1
        },
        centerContainer: {
          alignItems: 'center',
          justifyContent: 'center'
        },
        title: {
          fontSize: 22
        }
      });
      
    const COLORS = {
        primaryDark: '#22212c',
        primaryLight: '#f8f8f2',
        primaryRed: '#ff5555',
        primaryPink: '#ff80bf',
        primaryYellow: '#ffff80',
        primaryOrange: '#ff9580'
      };

  const [imageSource, setImageSource] = useState(null);
  return (
    <View
      style={[
        STYLES.flex,
        STYLES.centerContainer,
        { backgroundColor: COLORS.primaryDark }
      ]}
    >
      <Text style={[STYLES.title, { color: COLORS.primaryLight }]}>
        Simple Image Picker
      </Text>
    </View>
  );
}