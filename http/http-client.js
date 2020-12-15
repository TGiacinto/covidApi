const axios = require('axios');


function doCall(method, url) {

    return axios.request({
        method: method,
        url: url,
    }).then(res => res.data)
        .catch(err => console.error(err));

}
module.exports = {
    doCall,
}
