import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { AuthProvider } from './provider/Auth';
import { Routes } from '@/routes';
import App from './App';

vi.mock('@/store/store', () => ({
  store: {
    dispatch: vi.fn(),
    getState: vi.fn(),
    subscribe: vi.fn(),
    replaceReducer: vi.fn(),
  },
  persistor: {
    persist: vi.fn(),
  },
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
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
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('should contain the correct providers', () => {
    render(
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

    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
