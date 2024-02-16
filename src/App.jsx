import Navigation from "./components/Navigation";
import WebRoutes from "./routes/WebRoutes";
import { Toaster } from "@/components/ui/toaster";
import "./assets/styles.css";
import { useSelector } from "react-redux";
export const App = () => {
  const auth = useSelector((state) => state.auth);
  // console.log(auth);
  return (
    <>
      <Navigation auth={auth} />
      <WebRoutes />
      <Toaster />
    </>
  );
};

export default App;
