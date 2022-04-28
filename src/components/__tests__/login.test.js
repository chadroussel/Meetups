import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Login from "../Login";

it("checkButtonRender", () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const btn = queryByTitle("logIn");
  expect(btn).toBeTruthy();
});

describe("clickButton", () => {
  it("onClick", () => {
    const { queryByTitle } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const btn = queryByTitle("logIn");
    expect(btn.innerHTML).toBe("Log In");
    fireEvent.click(btn);
    expect(btn.innerHTML).toBe("Log In");
  });
});
