import ReactDOM from 'react-dom/client';
import { App } from '@/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { setupStore } from '@/store/store.ts';
import { Provider } from 'react-redux';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ChakraProvider theme={theme}>
		<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
		</Provider>
	</ChakraProvider>
);
