import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import "./sass/index.scss";

import MainRouter from "./routes/MainRouter/MainRouter";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
