import Container from "react-bootstrap/Container";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import HomePage from "./HomePage";
import Login from "./Login";
import AddStaff from "./PrivateManager/PrivateHomeManager/AddStaff";
import AllStaff from "./PrivateManager/PrivateHomeManager/AllStaff";
import PrivateHomeManager from "./PrivateManager/PrivateHomeManager/PrivateHomeManager";
import PrivateHomeClient from "./PrivateClient/PrivateHomeClient/PrivateHomeClient";
import SelectStaffRole from "./PrivateManager/PrivateHomeManager/SelectStaffRole";
import PrivateManager from "./PrivateManager/PrivateManager";
import PrivateHomeWorker from "./PrivateWorker/PrivateHomeWorker/PrivateHomeWorker";
import PrivateWorker from "./PrivateWorker/PrivateWorker";
import ResetPassword from "./ResetPassword";
import SelectRole from "./SelectRole";
import SignUp from "./SignUp";
import { StaffContextProvider } from "../contexts/fetches-contexts/StaffContext";
import WorkerQrCode from "./PrivateManager/PrivateHomeManager/WorkerQrCode";
import PrivateClient from "./PrivateClient/PrivateClient";
import VerifyUser from "./VerifyUser";
import SelectStaff from "./PrivateClient/PrivateHomeClient/SelectStaff";
import ChooseVerifMethod from "./ChooseVerifMethod";
import ValidatePhone from "./ValidatePhone";
import Cashout from "./PrivateWorker/PrivateHomeWorker/Cashout";
import OrderQrCode from "./PrivateManager/PrivateHomeManager/OrderQrCode";
import SuccessPayment from "./reusable/SuccessPayment";
import Checkout from "./reusable/Checkout";
import ModifyAccount from "./PrivateWorker/PrivateHomeWorker/ModifyAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/choose-verif-method"
          Component={ChooseVerifMethod}
        ></Route>
        <Route path="/validate-phone" Component={ValidatePhone}></Route>
        <Route path="/" Component={HomePage}></Route>
        <Route path="/selectRole" Component={SelectRole}></Route>
        <Route path="/signup" Component={SignUp}></Route>
        <Route path="/signIn" Component={Login}></Route>
        <Route path="/forgotpassword" Component={ForgotPassword}></Route>
        <Route path="/resetpassword" Component={ResetPassword}></Route>
        <Route path="/verifyUser" Component={VerifyUser}></Route>
        <Route
          path="/privateManager"
          element={
            <>
              <StaffContextProvider>
                <PrivateManager />
              </StaffContextProvider>
            </>
          }
        >
          <Route
            path="/privateManager/private-home-manager"
            element={<PrivateHomeManager />}
          />
          <Route
            path="/privateManager/private-home-manager/worker-qrcode/:userId"
            element={<WorkerQrCode />}
          />
          <Route
            path="/privateManager/private-home-manager/order-qrcode"
            element={<OrderQrCode />}
          />
          <Route
            path="/privateManager/private-home-manager/adyen"
            element={<Checkout />}
          />
          <Route
            path="/privateManager/private-home-manager/success-payment"
            element={<SuccessPayment />}
          />

          <Route
            path="/privateManager/private-home-manager/all-staff"
            element={<AllStaff />}
          />
          <Route
            path="/privateManager/private-home-manager/add-staff"
            element={<AddStaff />}
          />
          <Route
            path="/privateManager/private-home-manager/add-staff/select-staff-role"
            element={<SelectStaffRole />}
          />
        </Route>
        <Route path="/privateWorker" element={<PrivateWorker />}>
          <Route
            path="/privateWorker/private-home-worker"
            element={<PrivateHomeWorker />}
          />
          <Route
            path="/privateWorker/private-home-worker/modify-user"
            element={<ModifyAccount />}
          />
          <Route
            path="/privateWorker/private-home-worker/cashout"
            element={<Cashout />}
          />
        </Route>

        <Route
          path="/privateClient/:restaurantId"
          element={
            <>
              <StaffContextProvider>
                <PrivateClient />
              </StaffContextProvider>
            </>
          }
        >
          <Route
            path="/privateClient/:restaurantId/adyen"
            element={<Checkout />}
          />
          <Route
            path="/privateClient/:restaurantId/select-staff"
            element={<SelectStaff />}
          />
          <Route
            path="/privateClient/:restaurantId/private-home-client"
            element={<PrivateHomeClient />}
          />
          <Route
            path="/privateClient/:restaurantId/success-payment"
            element={<SuccessPayment />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
