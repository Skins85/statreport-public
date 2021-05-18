import React from "react";
import Season from "./season/season";
import { getQueriesForElement } from "@testing-library/dom";
import { render } from "@testing-library/react";

test("it works", () => {
  const { getByText, getByLabelText } = render(<ToDoList />);
  getByText("Season");
});
