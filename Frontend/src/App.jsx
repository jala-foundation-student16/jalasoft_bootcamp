import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./routes/Login";
import { Home } from "./routes/Home";
import { Header } from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationProvider } from "./provider/AuthenticationProvider";
import { Container } from "./components/Container/Container";

function App() {
  return (
    <AuthenticationProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Header />}>
              <Route path="/login" element={<Login />} />
              <Route
                path="/home"
                element={
                  
                  <Container>
                    <Home />
                  </Container>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthenticationProvider>
  );
}

export default App;
