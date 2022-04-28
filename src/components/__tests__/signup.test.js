import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Signup from "../../pages/Signup";
import { BrowserRouter } from "react-router-dom";

test("should render Signup component", () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
});

test("should be log in link", () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );

  const linkElement = screen.getByText(/Log In/i);
  expect(linkElement).toBeInTheDocument();
});
