import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = React.lazy(() => import("./pages/authentication/Login"));
const ForgotPassword = React.lazy(() =>
  import("./pages/authentication/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("./pages/authentication/ResetPassword")
);
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const TestEnvironment = React.lazy(() =>
  import("./pages/testEnvironment/TestEnvironment")
);
const TestExecution = React.lazy(() =>
  import("./pages/testExecution/TestExecution")
);
const Settings = React.lazy(() => import("./pages/settings/Settings"));
const TestManagement = React.lazy(() =>
  import("./pages/testManagement/TestManagement")
);
const TestReport = React.lazy(() => import("./pages/testReport/TestReport"));
const EditTestEnvironment = React.lazy(() =>
  import("./pages/testEnvironment/EditTestEnvironment")
);
const DefaultLayout = React.lazy(() => import("./components/DefaultLayout"));

function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <ToastContainer autoClose={2000} position="top-center" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test_environment" element={<TestEnvironment />} />
          <Route path="/test_execution" element={<TestExecution />} />
          <Route path="/profile" element={<Settings />} />
          <Route path="/test_management" element={<TestManagement />} />
          <Route path="/test_report" element={<TestReport />} />
          <Route path="/defaultLayout" element={<DefaultLayout />} />

          {/* =================EDIT================= */}
          <Route
            path="/edit_test_environment"
            element={<EditTestEnvironment />}
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;