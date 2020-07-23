import React from "react";

function Form({ details }) {
  if (!details) {
    return <h3>Working fetching your form&apos;s details...</h3>;
  }

  return (
    <div className="form container">
      <h2>{details.name}</h2>
      <p>Email: {details.email}</p>
      <p>Password: {details.password}</p>
      <p>Terms Of Service: {details.termsOfService}</p>
    </div>
  );
}

export default Form;
