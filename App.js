import { StyleSheet} from 'react-native';
import Map from './src/pages/Map';
import AddMark from './src/pages/AddMark';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={Map} options={{headerShown: false}}/>
        <Stack.Screen name="AddMark" component={AddMark} options={{title: 'Adicione um marcador', headerTitleAlign: 'center'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
