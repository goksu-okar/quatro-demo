import {
  BrowserRouter as Router, Routes, Route
 } from "react-router-dom";
 import { MantineProvider } from "@mantine/core";

 import PrivateRoute from "./utils/PrivateRoute";
 import Home from "./routes/home";
 import Login from "./routes/Login";
 import Orders from "./routes/Orders";
 import OrderPage from "./routes/OrderPage";
 import Customers from "./routes/Customers";
 import CustomerPage from "./routes/CustomerPage";

 export default function App () {
  return (
    <MantineProvider>
      <div>
        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<Home />} path="/" exact/>
              <Route element={<Orders />} path="/orders" exact/>
              <Route element={<OrderPage />} path="/order" />
              <Route element={<Customers />} path="/customers" />
              <Route element={<CustomerPage />} path="/customer/edit" />
            </Route>
            <Route element={<Login />} path="/login"/>
          </Routes>
        </Router>
      </div>
    </MantineProvider>
  )
 }
