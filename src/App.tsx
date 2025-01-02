import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

// Lazily import the main component
const FormCard = lazy(() => import("./components/form-card"));

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error: any) => {
              if (error?.response?.status === 404) return false;
              return failureCount < 2;
            },
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <main className="w-full h-dvh min-h-screen overflow-x-hidden overflow-y-auto bg-[#e4defe] flex justify-center p-4">
        <Suspense
          fallback={
            <div className="w-full h-dvh min-h-screen overflow-x-hidden overflow-y-auto bg-[#e4defe] flex justify-center items-center p-4 flex-col gap-4">
              <Loader2Icon className="animate-spin" size={25} />
              <h1>Loading...</h1>
            </div>
          }
        >
          <FormCard />
        </Suspense>
      </main>
    </QueryClientProvider>
  );
}

export default App;
