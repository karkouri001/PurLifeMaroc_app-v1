import React from 'react';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="splash" 
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="language-select" 
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="onboarding" />
      <Stack.Screen 
        name="(tabs)" 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="travel-styles-list" />
      <Stack.Screen name="destinations-list" />
      <Stack.Screen name="destination-details" />
      <Stack.Screen name="activities-list" />
      <Stack.Screen name="activity-details" />
      <Stack.Screen name="accommodation-list" />
      <Stack.Screen name="accommodation-details" />
      <Stack.Screen name="eat-drink" />
      <Stack.Screen name="insights" />
      <Stack.Screen name="recommendations" />
      <Stack.Screen name="search" />
      <Stack.Screen name="trip-planner" />
      <Stack.Screen name="budget-estimator" />
      <Stack.Screen name="chatbot" />
      <Stack.Screen name="enquiry" />
      <Stack.Screen name="enquiry-summary" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="itinerary-details" />
      <Stack.Screen name="chauffeur-details" />
      <Stack.Screen name="about-purlife" />
    </Stack>
  );
}
