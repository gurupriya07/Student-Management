
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getStudents } from "../studentdata.js";

function StudentDetails() {
  const { id } = useParams();
  const student = getStudents().find(
    s => String(s.id) === String(id)
  );

  if (!student) {
    return (
      <div className="details-card">
        <h2>Student Not Found!</h2>
        <p>This student record does not exist.</p>
        <Link to="/students" className="back-btn">
          Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Student Profile</h1>

      <div className="details-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>{student.name}</h2>
            <p>{student.department}</p>
          </div>
        </div>

        <div className="profile-info">
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Year:</strong> {student.year}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
        </div>

        <Link to="/students" className="back-btn">
          Back to Students
        </Link>
      </div>
    </div>
  );
}

export default StudentDetails;
