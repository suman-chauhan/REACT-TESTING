import React, { useState } from "react";
import validator from "validator";
const FormComponent = () => {
  const [signupInput, setsignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, seterror] = useState("");
  const handleChange = (e) => {
    setsignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();

    if (!validator.isEmail(signupInput.email)) {
      return seterror("Invalid email please enter a valid email");
    } else if (signupInput.password.length < 5) {
      return seterror("the password you entered should contain 5 or morecharacters");
    }
    else if (signupInput.password !== signupInput.confirmPassword) {
        return seterror("the password don't match. try Agin!");
      }
  };

  return (
    <div
      style={{ backgroundColor: "lightblue" }}
      className="container card   my-5"
    >
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={signupInput.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            value={signupInput.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm password" className="form-label">
            confirm password
          </label>
          <input
            type="password"
            id="confirm password"
            name="confirmPassword"
            className="form-control"
            onChange={handleChange}
            value={signupInput.confirmPassword}
          />
        </div>
      </form>
      {error && <p className="text-danger">{error}</p>}
      <button
        type="submit"
        className="btn btn-primary my-3"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
};

export default FormComponent;
