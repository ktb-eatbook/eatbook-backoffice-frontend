import { createRoot } from 'react-dom/client'
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <RouterProvider router={router} />
  </QueryClientProvider>
);
