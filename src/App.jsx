import {
  BrowserRouter as Router, Routes, Route
 } from "react-router-dom";
 import { MantineProvider } from "@mantine/core";

 import PrivateRoute from "./utils/PrivateRoute";
 import AppLayout from "./components/AppLayout";
 import Home from "./routes/home";
 import Orders from "./routes/Orders";
 import OrderPage from "./routes/OrderPage";
 import Customers from "./routes/Customers";

 export default function App () {
  return (
    <MantineProvider>
      <div>
        <Router>
          <Routes>
            <Route element={<AppLayout />}>
              <Route element={<Home />} path="/" exact/>
              <Route element={<PrivateRoute />}>
                <Route element={<Orders />} path="/orders" exact/>
                <Route element={<OrderPage />} path="/order" />
                <Route element={<Customers />} path="/customers" />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </MantineProvider>
  )
 }
