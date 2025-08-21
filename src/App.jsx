import React, { useState } from "react";

export default function App() {
  // initial array of employee objects in state
  const [employees, setEmployees] = useState([
    { id: 1, name: "Ravi Kumar", age: 28, salary: 45000, designation: "Developer" },
    { id: 2, name: "Sana Patel", age: 25, salary: 38000, designation: "QA Engineer" },
    { id: 3, name: "Amit Sharma", age: 32, salary: 60000, designation: "Team Lead" }
  ]);

  // local form state for adding a new employee
  const [newEmp, setNewEmp] = useState({
    name: "",
    age: "",
    salary: "",
    designation: ""
  });

  // handle form input changes (controlled inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmp((prev) => ({ ...prev, [name]: value }));
  };

  // add a new employee to the state array (immutable)
  const addEmployee = (e) => {
    e.preventDefault();
    const name = newEmp.name.trim();
    if (!name) return alert("Please enter a name.");

    // convert numbers
    const age = Number(newEmp.age) || 0;
    const salary = Number(newEmp.salary) || 0;

    // simple id generation
    const nextId = employees.length ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;

    const employee = {
      id: nextId,
      name,
      age,
      salary,
      designation: newEmp.designation.trim() || "Not set"
    };

    // set state immutably
    setEmployees((prev) => [...prev, employee]);

    // clear form
    setNewEmp({ name: "", age: "", salary: "", designation: "" });
  };

  // delete employee by id (immutable)
  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter(emp => emp.id !== id));
  };

  return (
    <div className="app-container">
      <header>
        <h1>Employee List (array of objects in state)</h1>
        <p className="note">Each employee: <code>name</code>, <code>age</code>, <code>salary</code>, <code>designation</code></p>
      </header>

      <section className="card">
        <h2>Current Employees</h2>
        <table className="emp-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Salary (₹)</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center" }}>No employees yet.</td></tr>
            ) : (
              employees.map((emp, idx) => (
                <tr key={emp.id}>
                  <td>{idx + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.age}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.designation}</td>
                  <td>
                    <button className="btn delete" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Add Employee</h2>
        <form className="form" onSubmit={addEmployee}>
          <input
            name="name"
            placeholder="Name"
            value={newEmp.name}
            onChange={handleChange}
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={newEmp.age}
            onChange={handleChange}
          />
          <input
            name="salary"
            type="number"
            placeholder="Salary (₹)"
            value={newEmp.salary}
            onChange={handleChange}
          />
          <input
            name="designation"
            placeholder="Designation"
            value={newEmp.designation}
            onChange={handleChange}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn primary">Add</button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => setNewEmp({ name: "", age: "", salary: "", designation: "" })}
            >
              Clear
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Raw state (for reference)</h2>
        <pre>{JSON.stringify(employees, null, 2)}</pre>
      </section>
    </div>
  );
}
