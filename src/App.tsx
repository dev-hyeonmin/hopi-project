import {QueryClient, QueryClientProvider} from 'react-query';
import {Routes} from './routes/Routes.tsx';
import ConformDialog from './module/ConformDialog.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConformDialog>
        <Routes />
      </ConformDialog>
    </QueryClientProvider>
  );
}

export default App;
