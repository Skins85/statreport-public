import App from './App';
import React from 'react';
import { shallow } from 'enzyme';

describe("App component tests", () => {

    test('App component renders without crashing', () => {
        shallow(<App />);
    });

});