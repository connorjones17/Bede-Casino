var axios = require('axios');
var apiUri = 'https://bedefetechtest.herokuapp.com/v1/'

module.exports = {
  fetchBets: () => {
    var marketsUri = apiUri + 'markets'

    return axios.get(marketsUri)
      .then(function (response) {
        return response.data
      })
  },
  sendBet: (bet) => {
    var postBetUri = apiUri + 'bets'

    return axios.post(postBetUri, bet)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        return error.response.data
      });
  }
}
