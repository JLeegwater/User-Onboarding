import React, { useState, useEffect } from "react";
import schema from "./formSchema";
import { reach } from "yup";
import "./App.css";
import axios from "axios";
import Form from "./Form";

const initialFormValues = {
  ///// TEXT INPUTS /////
  name: "",
  email: "",
  password: "",
  ///// CHECKBOXES /////
  tos: false,
};
const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  tos: "",
};

const initialUsers = [];
const initialDisabled = true;

function App() {
  //////////////// STATES ////////////////
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean

  //////////////// HELPERS ////////////////

  const postNewUser = (newUser) => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://buddies.com/api/friends`
    //    and regardless of success or failure, the form should reset
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        console.log(res);
        setUsers([...users, res.data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const validate = (name, value) => {
    reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  //////////////// EVENT HANDLERS ////////////////
  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value, // NOT AN ARRAY
    });
  };

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      // 🔥 STEP 7- WHAT ABOUT HOBBIES?
      tos: ["Terms of Service"].filter((tos) => formValues[tos]),
    };
    // 🔥 STEP 8- POST NEW FRIEND USING HELPER
    postNewUser(newUser);
  };

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div className="App">
      <header>
        <h1>Account Creation App</h1>
      </header>

      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      <div className="user container">
        <h2>List of Users</h2>
        {users.map((user) => {
          return <p>{user.name}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
