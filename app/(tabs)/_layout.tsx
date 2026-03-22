import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {BlurView} from 'expo-blur';
import {Tabs} from 'expo-router';
import {Home as HomeIcon, Scale, Users} from 'lucide-react-native';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Platform, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {HapticTab} from '@/components/haptic-tab';
import {TabChromeProvider, useTabChrome} from '@/hooks/TabChromeContext';
import '../../global.css';

const ACTIVE_COLOR = '#334155'; // blue-600 — visible on white
const INACTIVE_COLOR = '#9CA3AF'; // gray-400

function CustomTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const {chromeVisible} = useTabChrome();
  const visibilityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(visibilityAnim, {
      toValue: chromeVisible ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
  }, [chromeVisible, visibilityAnim]);

  const visibleRoutes = state.routes.filter(
    route => (descriptors[route.key].options as any).href !== null
  );

  const tabBarTranslateY = visibilityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [110, 0]
  });
  const tabBarOpacity = visibilityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <Animated.View
      className="absolute left-0 right-0 items-center pointer-events-box-none"
      pointerEvents={chromeVisible ? 'auto' : 'none'}
      style={{
        bottom: Math.max(insets.bottom + 4, 18),
        transform: [{translateY: tabBarTranslateY}],
        opacity: tabBarOpacity
      }}
    >
      <View
        className="rounded-full overflow-hidden"
        style={{
          height: 74,
          backgroundColor: 'rgba(248,250,252,0.72)',
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.92)',
          // shadow
          shadowColor: '#000',
          shadowOpacity: 0.24,
          shadowRadius: 22,
          shadowOffset: {width: 0, height: 9},
          elevation: 14,
          // compact width — wraps content with min padding
          alignSelf: 'center',
          minWidth: 300
        }}
      >
        <BlurView
          intensity={Platform.OS === 'ios' ? 10 : 90}
          tint="light"
          style={{
            flex: 1,
            paddingHorizontal: 14,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8
          }}
        >
          {visibleRoutes.map(route => {
            const {options} = descriptors[route.key];
            const index = state.routes.indexOf(route);
            const isFocused = state.index === index;
            const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                activeOpacity={0.7}
                className="items-center justify-center rounded-2xl"
                style={{
                  minWidth: 88,
                  height: 56,
                  paddingHorizontal: 14,
                  backgroundColor: 'transparent'
                }}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
              >
                {options.tabBarIcon?.({color, focused: isFocused, size: 24})}
                <Text
                  style={{
                    color,
                    fontSize: 12,
                    marginTop: 3,
                    fontWeight: isFocused ? '700' : '500'
                  }}
                >
                  {options.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </BlurView>
      </View>
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <TabChromeProvider>
      <Tabs
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab
        }}
        initialRouteName="index"
      >
        <Tabs.Screen
          name="compare"
          options={{
            title: 'Compare',
            tabBarIcon: ({color}) => <Scale size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({color}) => <HomeIcon size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name="ballot"
          options={{
            title: 'Ballot',
            tabBarIcon: ({color}) => <Users size={24} color={color} />
          }}
        />
      </Tabs>
    </TabChromeProvider>
  );
}
