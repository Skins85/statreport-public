// index.test.js
const getFirstResult = require('./data-fetch');

const axios = require('axios');

jest.mock('axios');

it('Returns first result from feed', async () => {
  axios.get.mockResolvedValue({
        results: [
            {
                "first_name": "Corey",
                "surname": "Whitely",
                "match_id": "1617-fac-01r",
                "scorer_id": "whitely-corey",
                "season": "2016-17"
            }
        ]
  });

  const first_name = await getFirstResult();
  expect(first_name).toEqual('Corey');
});