import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import ReactDOM from 'react-dom';
import Teams from './teams';
import {fetchData} from './Teams';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

describe("Teams component tests", () => {

    it('renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Teams></Teams>, div);
        // const title = await {fetchData};
        // expect(title).toEqual('a'); 
    });

    it ('renders test p tag', () => {
        const {getByTestId} = render(<p data-testid='abc'>test</p>);
        expect(getByTestId('abc')).toHaveTextContent('test');
    })

})