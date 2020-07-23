import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import Form from "./User";
import FForm from "./UserForm";
import FormSchema from "./formSchema";

import "./App.css";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  termsOfService: false, //checkbox
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
};

const initialUser = [];
const initialDisabled = true;

// Name
// Email
// Password
// Terms of Service (checkbox)
// A Submit button to send our form data to the server.

function App() {
  const [user, setUser] = useState(initialUser); // array of user objects
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean

  const getUser = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        setUser(response.data.data);
        console.log("DATA is", response.data.data);
      })
      .catch((err) => console.log("err GET User", err));
  };

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUser([res.data, ...user]);
        setFormValues(initialFormValues);
      })
      .catch((err) => console.log("err POST forms", err));
  };

  const inputChange = (name, value) => {
    yup
      .reach(FormSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })

      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const checkboxChange = (name, isChecked) => {
    setFormValues({
      ...formValues,
      termsOfService: isChecked,
      // },
    });
  };

  const submit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      termsOfService: formValues.termsOfService,
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    FormSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="App">
      <header>
        <h1>List of Users</h1>
      </header>

      <FForm
        values={formValues}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
      />

      {Object.values(user).map((each) => {
        return <Form key={each.id} details={each} />;
      })}
    </div>
  );
}

export default App;
