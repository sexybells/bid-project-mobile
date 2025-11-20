import {Stack} from 'expo-router';

export default function AuthStack() {
    return (
        <Stack initialRouteName="RegisterScreen">
            <Stack.Screen name="LoginScreen" options={{headerShown: false}}/>
            <Stack.Screen name="RegisterScreen" options={{headerShown: false}}/>
        </Stack>
    );
}