import PropTypes from 'prop-types';
import React, { useState } from "react";

import "./styles/modal.css";

const AddUserModal = ({ onAddUser, onClose }) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifiez que les mots de passe correspondent avant d'ajouter l'utilisateur
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Assurez-vous que toutes les valeurs sont définies avant d'ajouter
    if (fname && lname && phone && email && password) {
      onAddUser({ name: `${fname} ${lname}`, Tel: phone, Email: email, Password: password });
      setFName("");
      setLName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      onClose();
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">
            First Name* :
            <input
              type="text"
              value={fname}
              onChange={(e) => setFName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="lname">
            Last Name* :
            <input
              type="text"
              value={lname}
              onChange={(e) => setLName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="phone">
            Phone* :
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label htmlFor="email">
            Email* :
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            Password* :
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm Password* :
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <div className="button-container">
            <button type="submit">Add User</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddUserModal.propTypes = {
  onAddUser: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddUserModal;