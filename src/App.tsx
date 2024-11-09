import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { AuthProvider } from './provider/Auth';
import { Routes } from '@/routes';
function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
