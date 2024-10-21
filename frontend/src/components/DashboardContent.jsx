import React, { useState, useEffect } from 'react';
import './DashboardContent.css'; // Custom CSS file for styling

const DashboardContent = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientDetails, setPatientDetails] = useState([]);
  const [appointmentRequests, setAppointmentRequests] = useState([]);

  useEffect(() => {
    // Fetch appointments data
    fetch('/api/appointments')
      .then(response => response.json())
      .then(data => setAppointments(data));

    // Fetch patient details data
    fetch('/api/patientDetails')
      .then(response => response.json())
      .then(data => setPatientDetails(data));

    // Fetch appointment requests
    fetch('/api/appointmentRequests')
      .then(response => response.json())
      .then(data => setAppointmentRequests(data));
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome !</h1>
        <p>Have a nice day at great work!</p>
        <div className="date-display">20 February, 2024</div>
      </header>

      <div className="statistics">
        <div className="stat-card green">
          <h3>Appointments</h3>
          <p>50</p>
        </div>
        <div className="stat-card purple">
          <h3>Consultancy</h3>
          <p>40</p>
        </div>
        <div className="stat-card blue">
          <h3>Pending</h3>
          <p>20</p>
        </div>
        <div className="stat-card grey">
          <h3>Requests</h3>
          <p>10</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <section className="section">
          <h2>Today's Appointments</h2>
          <ul className="appointment-list">
            {appointments.map(appointment => (
              <li key={appointment.id} className="appointment-item">
                <img src={appointment.avatar} alt={appointment.name} className="avatar" />
                <div className="appointment-info">
                  <strong>{appointment.name}</strong> - {appointment.type}
                </div>
                <div className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h2>Patient Details</h2>
          {patientDetails.length > 0 && (
            <div className="patient-details">
              <img src={patientDetails[0].avatar} alt="Patient Avatar" className="avatar" />
              <div className="patient-info">
                <strong>{patientDetails[0].name}</strong>
                <p>{patientDetails[0].condition}</p>
                <div className="tags">
                  {patientDetails[0].tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <p>Last prescription</p>
              </div>
            </div>
          )}
        </section>

        <section className="section">
          <h2>Appointment Requests</h2>
          <table className="request-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointmentRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.name}</td>
                  <td>{request.date}</td>
                  <td>{request.time}</td>
                  <td>
                    <button className="accept-button">✔</button>
                    <button className="decline-button">✘</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default DashboardContent;
