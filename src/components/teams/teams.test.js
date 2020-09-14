import React from 'react';
import {fetchData} from './Teams';
import { shallow } from 'enzyme';

describe("Teams component tests", () => {

    it('returns data', async () => {
        const title = await {fetchData};
        expect(title).toEqual('a'); 
    });

})