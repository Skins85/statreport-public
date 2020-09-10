import React from 'react';
import Teams from './Teams';
import { shallow } from 'enzyme';

describe("Teams component tests", () => {

    it('Teams component renders without crashing', () => {
        shallow(<Teams />);
    });

})