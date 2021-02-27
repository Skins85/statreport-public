import Matches from './match';
import React from "react";
import { getQueriesForElement } from "@testing-library/dom";
import { render } from "@testing-library/react";
const axios = require('axios');

jest.mock('axios');

test('Match component renders without crashing', () => {
    render(<Matches />);
});