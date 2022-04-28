import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import ForgotPassword from "../ForgotPassword";

jest.mock("firebase/auth", () => ({ getAuth: jest.fn() }));

function renderForgotPassword() {
  return render(
    <BrowserRouter>
      <ForgotPassword />
    </BrowserRouter>
  );
}

test("should be sign up link", () => {
  renderForgotPassword();

  const linkElement = screen.getByText(/Sign Up/i);
  expect(linkElement).toBeInTheDocument();
});

test("should be log in link", () => {
  renderForgotPassword();

  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
