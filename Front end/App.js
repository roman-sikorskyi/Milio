import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import  UserProvider from './components/UserProvider';
import {StepOne} from './screens/StepOne';
import {StepTwo} from './screens/StepTwo';
import {StepThree} from './screens/StepThree';
import LoginScreen from './screens/LoginScreen';
import {ResetPasswordScreen} from './screens/ResetPasswordScreen';
import {MainScreen} from './screens/MainScreen';
import {BackButton} from './components/BackButton';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ProfileScreen from './screens/ProfileScreen';
import { MapScreen } from './screens/MapScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import SettingsScreen from './screens/SettingsScreen';
import MilioInfoScreen from './screens/MilioInfoScreen';
import HelpScreen from './screens/HelpScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import RulesScreen from './screens/RulesScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import FAQsScreen from './screens/FAQsScreen';
import SupportScreen from './screens/SupportScreen';
import LogoutScreen from './screens/LogoutScreen';
import DeleteAccountScreen from './screens/DeleteAccountScreen';
import NotificationsScreen from './screens/NotificationsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Proposals') {
            iconName = "bag-handle-outline";
          } else if (route.name === 'Map') {
            iconName = 'map-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D4C295',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Proposals"
        component={MainScreen} // або компонент сторінки зі списком оголошень
        options={{ title: 'Пропозиції', headerShown: false }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ title: 'Мапа', headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Профіль', headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: false ,headerStyle: {backgroundColor: '#D4C295',}}}>
          <Stack.Screen name="StepOne" component={StepOne} options={{ headerShown:false, headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', }} />
          <Stack.Screen name="StepTwo" component={StepTwo} options={({ navigation }) => ({ headerShown: true, headerStyle: { backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />, })} />
          <Stack.Screen name="StepThree" component={StepThree} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={({ navigation }) => ({headerStyle: {backgroundColor: '#D4C295',}, headerTitle: ''})} />
          <Stack.Screen name="Login" component={LoginScreen} options={({ navigation }) => ({headerShown: true,бheaderStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={({ navigation }) => ({headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={({ navigation }) => ({ headerShown: true, headerStyle: { backgroundColor: '#D4C295' }, headerTitle: '',headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Tab" component={BottomTabNavigator} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="MilioInfo" component={MilioInfoScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="Help" component={HelpScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="Rules" component={RulesScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="AboutUs" component={AboutUsScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="FAQs" component={FAQsScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="Support" component={SupportScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="Logout" component={LogoutScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} options={({ navigation }) => ({ headerShown: true,headerStyle: {backgroundColor: '#D4C295',}, headerTitle: '', headerLeft: () => <BackButton navigation={navigation} />,})} />
       </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}


