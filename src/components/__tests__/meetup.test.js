import { render, screen, cleanup } from "@testing-library/react";
import App from "../../App";
import AllMeetupsPage from "../../pages/AllMeetupsPage";
import PrivateWrapper from "./components/PrivateRoute";
import "firebase/compat/auth";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Signup from "../../pages/Signup";

test("should render Signup component", () => {
  render(
    <AuthProvider>
      <Signup />
    </AuthProvider>
  );

  const signupElement = screen.getByRole("section");
  expect(signupElement).toBeInTheDocument();
});
