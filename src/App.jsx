import Navigation from "./components/Navigation";
import WebRoutes from "./routes/WebRoutes";
import { Toaster } from "@/components/ui/toaster";
import "./assets/styles.css";
export const App = () => {
  return (
    <>
      <Navigation />
      <WebRoutes />
      <Toaster />
    </>
  );
};

export default App;
