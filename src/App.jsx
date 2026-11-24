
import React, { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout";
import Notification from "./components/Notification";

import Home from "./pages/Home";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  const [notification, setNotification] = useState({
    message: "",
    type: "success"
  });

  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
  }, []);

  const closeNotification = useCallback(() => {
    setNotification({ message: "", type: "success" });
  }, []);

  return (
    <BrowserRouter>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />

      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />

          <Route
            path="students"
            element={<Students showNotification={showNotification} />}
          />

          <Route
            path="students/:id"
            element={<StudentDetails />}
          />

          <Route path="about" element={<About />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
