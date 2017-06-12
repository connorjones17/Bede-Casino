var React = require('react')
var BettingService = require('./BettingService')
var BettingSlip = require('./BettingSlip')
var api = require('../utils/ajax')

class Markets extends React.Component {

  constructor() {
    super()
    this.state = {
      bets: null,
      openBets: [],
      placedBets: [],
      errorMessage: ''
    }

    this.handleOpenBet = this.handleOpenBet.bind(this)
    this.handlePlaceBet = this.handlePlaceBet.bind(this)
  }

  componentDidMount() {
    api.fetchBets()
      .then((bets) => {
        this.setState( () => {
          return {
            bets: bets
          }
        })
      })
  }

  handleOpenBet(bet) {
    let exists = false
    this.state.openBets.map((openBet) => {
      if (openBet.bet_id === bet.bet_id) exists = true
    })
    if (exists === true) return
    let openBets = this.state.openBets
    bet['stake'] = null
    bet['errorMessage'] = ''
    openBets.push(bet)

    this.setState(() => {
      return {
        openBets: openBets
      }
    })
  }

  handlePlaceBet(betId, stake) {
    let bets = this.state.openBets
    let betPlaced = {}
    bets.map((bet) => {
      if (bet.bet_id == betId) {
        betPlaced['bet_id'] = betId
        betPlaced['odds'] = bet.odds
        betPlaced['stake'] = stake
      }
    })

    api.sendBet(betPlaced).then((response) => {
      if (response.status === 201) {

        let placedBets = (this.state.placedBets) ? this.state.placedBets : {}
        placedBets.push(response.data)

        bets = bets.filter((bet) => {
          return bet.bet_id !== betId
        })

        this.setState(() => {
          return {
            placedBets: placedBets,
            openBets: bets
          }
        })
      } else if (response.statusCode === 400) {
        bets = bets.map((bet) => {
          if (bet.bet_id == betId) {
            bet.errorMessage = response.message
          }
          return bet
        })

        this.setState(() => {
          return {
            openBets: bets
          }
        })
      }
    })
  }

  render() {
    return (
      <div className="market-container">
        <Header />
        <div className="betting-service-container">
          {!this.state.bets
            ? <h2 className="loading-content"> Loading... </h2>
            : <BettingService bets={ this.state.bets } handleOpenBet={ this.handleOpenBet } />
          }
        </div>
        <div className="bet-slip-container">
          <BettingSlip openBets={ this.state.openBets }
                       placedBets={ this.state.placedBets }
                       handlePlaceBet={ this.handlePlaceBet }
          />
        </div>
      </div>
    )
  }
}

module.exports = Markets

function Header() {
  return (
    <div className="header-container">
      <img className="logo-img" src="http://bedegaming.com/wp-content/uploads/2015/11/bede-logo1.png" />
      <h1 className="header-title"> Sports Betting Page </h1>
    </div>
  )
}