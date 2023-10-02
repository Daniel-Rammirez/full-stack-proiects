import { Route, Routes } from "react-router-dom";
import "./App.css";
import { IndexPage } from "./pages/IndexPage";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./Layout";
import { RegisterPage } from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./context/user";
import { AccountPage } from "./pages/AccountPage";

// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.baseURL = "http://127.0.0.1:4000";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
