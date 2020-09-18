import '@testing-library/jest-dom/extend-expect';

import { act, cleanup, queryByAttribute, render, screen } from '@testing-library/react';
import {getByTitle, querySelector} from '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';

import React from 'react';
import ReactDOM from 'react-dom';
import Teams from './teams';
import {fetchData} from './Teams';
// import "jest-dom/extend-expect";



const getById = queryByAttribute.bind(null, 'id');


describe("Teams component tests", () => {

    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Teams />);
    });
    
    const dom = render(<Teams />);

    test('API call successful', async () => {
        expect(dom.queryByText(/test/)).toBeNull();
        expect(await dom.findByText(/test/)).toBeInTheDocument();
    });

    test('API call successful & data wrapper loaded', async () => {
        // const dataWrapper = screen.getByTitle('data');
        expect(dom.getByTitle('data')).toBeNull();
        expect(await dom.findByTitle('no-data').toBeInTheDocument());
    });

})