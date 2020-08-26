import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

const axiosCacheAdapter = (props) => {
    // Create `axios-cache-adapter` instance
    const cache = setupCache({
        maxAge: 15 * 60 * 1000
    })
    
    // Create `axios` instance passing the newly created `cache.adapter`
    const api = axios.create({
        adapter: cache.adapter
    })

    api({
        url: `${props.targetUrl}`,
        method: 'get'
    })
    .then(async (response) => {
        console.log(response.data);
    })
}

export default axiosCacheAdapter;