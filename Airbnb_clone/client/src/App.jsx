import { Route, Routes } from "react-router-dom";
import "./App.css";
import { IndexPage } from "./pages/IndexPage";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./Layout";
import { RegisterPage } from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./context/user";
import { ProfilePage } from "./pages/ProfilePage";
import { PlacesPage } from "./pages/PlacesPage";
import { PlacesFormPage } from "./pages/PlacesFormPage";
import { InfoPlacePage } from "./pages/InfoPlacePage";

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
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/listings" element={<PlacesPage />} />
          <Route path="/account/listings/new" element={<PlacesFormPage />} />
          <Route path="/account/listings/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<InfoPlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
