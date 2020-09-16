// import '@testing-library/jest-dom/extend-expect';

import '@testing-library/jest-dom';

import { act, render, screen } from '@testing-library/react';
import { mount, shallow } from 'enzyme';

import React from 'react';
import ReactDOM from 'react-dom';
import Teams from './teams';
import {fetchData} from './Teams';

describe("Teams component tests", () => {

    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Teams />);
        // console.log(wrapper.debug());
    });

    test('Data after re-render', async () => {
        render(<Teams />);
    
        expect(screen.queryByText(/test/)).toBeNull();
    
        expect(await screen.findByText(/test/)).toBeInTheDocument();
    });

    

    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */


})