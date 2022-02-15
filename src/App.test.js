import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

// test("renders learn react link", () => {
//   // 1) rendring the elemnt we want to test

//   render(<App />);

//   // 2)Finding the Element

//   const linkElement = screen.getByText(/learn react/i);
//   // 3) Assertion
//   expect(linkElement).toBeInTheDocument();
// });

beforeEach(() => {
  console.log("this will run before every test");
  render(<App />);
});

beforeAll(() => {
  console.log("this will run before all test at one time");
});
afterAll(() => {
  console.log("this will run after all test at one time");
});

afterEach(() => {
  console.log("this will run after every test");
});
test("input should be initially empty", () => {
  const emailInpputElement = screen.getByRole("textbox");
  const passwordInpputElement = screen.getByLabelText(/email/i);
  expect(emailInpputElement.value).toBe("");
  expect(passwordInpputElement.value).toBe("");
});
test("inputs should be initially empty", () => {
  const allInputbox = screen.getByRole("textbox");
  expect(allInputbox.value).toBe("");
  const emailInput = screen.getByLabelText(/email/i);
  expect(emailInput.value).toBe("");
  const passwordInputBox = screen.getByLabelText("Password");
  expect(passwordInputBox.value).toBe("");
  const confirmPasswordInputBox = screen.getByLabelText(/confirm password/i);
  expect(confirmPasswordInputBox.value).toBe("");
});

test("user should be able to type an email", () => {
  const userInput = screen.getByRole("textbox", {
    name: /email/i,
  });
  userEvent.type(userInput, "sumansingh123@gmail.com");
  expect(userInput.value).toBe("sumansingh123@gmail.com");
});

test("user should be able to type an password", () => {
  const userInput = screen.getByLabelText("Password");
  userEvent.type(userInput, "password!");
  expect(userInput.value).toBe("password!");
});
test("user should be able to type an confirm password", () => {
  const userInput = screen.getByLabelText(/confirm password/i);
  userEvent.type(userInput, "password!");
  expect(userInput.value).toBe("password!");
});

test(" should  show an error message  when user input a invalid email", () => {
  const invalidEmailError = screen.queryByText(
    /Invalid email please enter a valid email/i
  );
  const userInput = screen.getByRole("textbox", {
    name: /email/i,
  });
  expect(invalidEmailError).not.toBeInTheDocument();

  userEvent.type(userInput, "sumansinghgmail.com");
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });
  userEvent.click(submitButtonElement);
  const invalidEmailError1 = screen.queryByText(
    /Invalid email please enter a valid email/i
  );
  expect(invalidEmailError1).toBeInTheDocument();
});

test("should show a password error if password is less than 5 character", () => {
  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInput = screen.getByLabelText("Password");
  const userInput = screen.getByLabelText(/confirm password/i);
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or morecharacters/i
  );
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.type(emailInput, "summichauhn123@gmail.com");
  expect(passwordErrorElement).not.toBeInTheDocument();
  userEvent.type(passwordInput, "123");
  userEvent.click(submitButtonElement);
  const passwordErrorElementAgin = screen.queryByText(
    /the password you entered should contain 5 or morecharacters/i
  );
  expect(passwordErrorElementAgin).toBeInTheDocument();
});

test("should show a  error if password dose not match to confirm-password", () => {
  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });
  const confirmpasswordInput = screen.getByLabelText(/confirm password/i);
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordErrorElement = screen.queryByText(
    /the password don't match. try Agin!/i
  );
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.type(emailInput, "summi123@gmail.com");
  userEvent.type(passwordInput, "12345");
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
  userEvent.type(confirmpasswordInput, "123456");
  userEvent.click(submitButtonElement);
  const confirmPasswordErrorElementAgin = screen.queryByText(
    /the password don't match. try Agin!/i
  );
  expect(confirmPasswordErrorElementAgin).toBeInTheDocument();
});

test("clear all errors if all fields are valid", () => {
  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });
  const confirmpasswordInput = screen.getByLabelText(/confirm password/i);
  const passwordInput = screen.getByLabelText("Password");

  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.type(emailInput, "summi123@gmail.com");
  userEvent.type(passwordInput, "12345");
  userEvent.type(confirmpasswordInput, "12345");
  userEvent.click(submitButtonElement);

  const invalidEmailError = screen.queryByText(
    /Invalid email please enter a valid email/i
  );
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or morecharacters/i
  );
  const confirmPasswordErrorElementAgin = screen.queryByText(
    /the password don't match. try Agin!/i
  );
  expect(invalidEmailError).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElementAgin).not.toBeInTheDocument();
});
