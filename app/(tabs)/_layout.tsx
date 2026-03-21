import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Tabs} from 'expo-router';
import {Home as HomeIcon, Scale, Users} from 'lucide-react-native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {HapticTab} from '@/components/haptic-tab';
import '../../global.css';

const ACTIVE_COLOR = '#334155'; // blue-600 — visible on white
const INACTIVE_COLOR = '#9CA3AF'; // gray-400

function CustomTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const visibleRoutes = state.routes.filter(
    route => (descriptors[route.key].options as any).href !== null
  );

  return (
    <View className="absolute bottom-10 left-0 right-0 items-center pointer-events-box-none">
      <View
        className="flex-row items-center bg-white rounded-full px-4"
        style={{
          height: 68,
          // shadow
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 18,
          shadowOffset: {width: 0, height: 8},
          elevation: 10,
          // compact width — wraps content with min padding
          alignSelf: 'center',
          paddingHorizontal: 24,
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
              className="items-center justify-center rounded-2xl py-2"
              style={{minWidth: 72}}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
            >
              {options.tabBarIcon?.({color, focused: isFocused, size: 24})}
              <Text
                style={{
                  color,
                  fontSize: 11,
                  marginTop: 3,
                  fontWeight: isFocused ? '600' : '400'
                }}
              >
                {options.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
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
  );
}
