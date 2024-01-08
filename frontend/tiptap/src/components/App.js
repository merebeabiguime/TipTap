import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StaffContextProvider } from "../contexts/fetches-contexts/StaffContext";
import ChooseVerifMethod from "./ChooseVerifMethod";
import ForgotPassword from "./ForgotPassword";
import HomePage from "./HomePage";
import Login from "./Login";
import PrivateClient from "./PrivateClient/PrivateClient";
import PrivateHomeClient from "./PrivateClient/PrivateHomeClient/PrivateHomeClient";
import SelectStaff from "./PrivateClient/PrivateHomeClient/SelectStaff";
import AddStaff from "./PrivateManager/PrivateHomeManager/AddStaff";
import AllStaff from "./PrivateManager/PrivateHomeManager/AllStaff";
import OrderQrCode from "./PrivateManager/PrivateHomeManager/OrderQrCode";
import PrivateHomeManager from "./PrivateManager/PrivateHomeManager/PrivateHomeManager";
import SelectStaffRole from "./PrivateManager/PrivateHomeManager/SelectStaffRole";
import WorkerQrCode from "./PrivateManager/PrivateHomeManager/WorkerQrCode";
import PrivateManager from "./PrivateManager/PrivateManager";
import Cashout from "./PrivateWorker/PrivateHomeWorker/Cashout";
import ModifyAccount from "./PrivateWorker/PrivateHomeWorker/ModifyAccount";
import PrivateHomeWorker from "./PrivateWorker/PrivateHomeWorker/PrivateHomeWorker";
import PrivateWorker from "./PrivateWorker/PrivateWorker";
import SignUp from "./SignUp";
import ValidatePhone from "./ValidatePhone";
import ResetPassword from "./Verification";
import VerifyUser from "./VerifyUser";
import Checkout from "./reusable/Checkout";
import SuccessPayment from "./reusable/SuccessPayment";

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
        <Route path="/signup/:role?" Component={SignUp}></Route>
        <Route path="/signIn" Component={Login}></Route>
        <Route path="/forgotpassword" Component={ForgotPassword}></Route>
        <Route path="/verification" Component={ResetPassword}></Route>
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
