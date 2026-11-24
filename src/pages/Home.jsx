
import React from "react";

function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Student Management System!</p>

      <div className="stats">

        <div className="stat-card">
          <h3>Total Students</h3>
          <h1>120</h1>
          <span>👨‍🎓 Registered Students</span>
        </div>

        <div className="stat-card">
          <h3>Active Students</h3>
          <h1>100</h1>
          <span>✅ Active Records</span>
        </div>

        <div className="stat-card">
          <h3>Departments</h3>
          <h1>5</h1>
          <span>🏢 Available Departments</span>
        </div>

      </div>

      <div className="welcome-card">
        <h2>Student Management System</h2>

        <p>
          Manage student information, academic details
          and student records in one place.
        </p>
      </div>

    </div>
  );
}

export default Home;
