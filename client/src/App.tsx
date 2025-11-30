import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TRPCProvider, trpcClient } from "./utils/trpc.ts";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <AppRoutes />
      </TRPCProvider>
    </QueryClientProvider>
  );
}

export default App;
