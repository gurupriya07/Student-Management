
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudents, saveStudents } from "../studentdata.js";

function Students({ showNotification }) {
  const [students, setStudents] = useState(getStudents);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    name: "",
    department: "",
    year: "",
    email: "",
    phone: ""
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (student) => {
    setEditId(student.id);
    setForm({
      name: student.name,
      department: student.department,
      year: student.year,
      email: student.email,
      phone: student.phone
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(form).some(value => !value.trim())) {
      showNotification("Please fill all fields!", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      showNotification("Invalid email address!", "error");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      showNotification("Enter a valid 10 digit phone number!", "error");
      return;
    }

    if (editId !== null) {
      setStudents(prev =>
        prev.map(s =>
          s.id === editId ? { ...s, ...form } : s
        )
      );
      showNotification("Student updated successfully!");
    } else {
      setStudents(prev => [
        ...prev,
        { id: Date.now(), ...form }
      ]);
      showNotification("Student added successfully!");
    }

    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const deleteStudent = (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    setStudents(prev => prev.filter(s => s.id !== id));
    showNotification("Student deleted successfully!");
  };

  const filteredStudents = students.filter(s =>
    [s.name, s.department, s.email]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="students-page">
      <div className="page-heading">
        <div>
          <h1>Student Management</h1>
          <p>Manage all student records in one place.</p>
        </div>

        <button className="add-btn" onClick={openAdd}>
          + Add Student
        </button>
      </div>

      <div className="student-summary">
        <div>
          <span>Total Students</span>
          <h2>{students.length}</h2>
        </div>

        <div>
          <span>Departments</span>
          <h2>{new Set(students.map(s => s.department)).size}</h2>
        </div>

        <div>
          <span>Search Results</span>
          <h2>{filteredStudents.length}</h2>
        </div>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>{editId !== null ? "Edit Student" : "Add New Student"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input name="name" placeholder="Student Name"
                value={form.name} onChange={handleChange} />

              <input name="department" placeholder="Department"
                value={form.department} onChange={handleChange} />

              <input name="year" placeholder="Academic Year"
                value={form.year} onChange={handleChange} />

              <input name="email" type="email" placeholder="Email"
                value={form.email} onChange={handleChange} />

              <input name="phone" placeholder="10 Digit Phone Number"
                maxLength="10" value={form.phone}
                onChange={handleChange} />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                {editId !== null ? "Update Student" : "Save Student"}
              </button>

              <button type="button" className="cancel-btn"
                onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-toolbar">
        <h2>All Students</h2>
        <input className="search-box"
          placeholder="Search students..."
          value={search}
          onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Year</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td>{String(student.id).slice(-5)}</td>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>{student.email}</td>
                <td>
                  <div className="action-buttons">
                    <Link className="view-btn"
                      to={`/students/${student.id}`}>
                      View
                    </Link>

                    <button className="edit-btn"
                      onClick={() => openEdit(student)}>
                      Edit
                    </button>

                    <button className="delete-btn"
                      onClick={() => deleteStudent(student.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-message">
                  No students found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
