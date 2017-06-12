var React = require('react')

class BettingSlip extends React.Component {

  constructor() {
    super()

    this.state = {}

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div>
        <h1 className="bet-slip-header"> Betting Slip </h1>

          <h3> Your Open Bets </h3>

          { this.props.openBets.map((openBet) => {
            let name = "stake_" + openBet.bet_id
            let value = (this.state[name] == undefined) ? '' : this.state[name]
            return (
                <div key={ openBet.bet_id }>

                  { openBet.errorMessage !== '' &&
                      <div className="bet-slip-error-container">
                        <p>Sorry an error occurred whilst processing your bet:</p>
                        <p>Message: {openBet.errorMessage}</p>
                        <p>Please try again</p>
                      </div>
                  }

                  <h4 className="bet-slip-open-bet"> { openBet.event } </h4>
                  <p> { openBet.name } at
                  <span> { (openBet.odds.numerator == openBet.odds.denominator)
                    ? 'Evens'
                    : openBet.odds.numerator + '/' + openBet.odds.denominator
                  } </span>
                  </p>

                 <div>
                   <label>
                     Stake
                      <input className="bet-slip-stake-input"
                             type="text"
                             placeholder="£"
                             name={ name }
                             value={ value }
                             onChange={this.handleChange}
                      />
                   </label>
                    <button className="bet-slip-submit-button" onClick={this.props.handlePlaceBet.bind(null, openBet.bet_id, value)}> Bet </button>
                  </div>
                </div>
              )
          })
        }
        <div className="betting-slip-placed-bet-container">
          <h3>Your Placed Bets</h3>
          { this.props.placedBets.map((placedBet, key) => {
            return <PlacedBets key={key} placedBet={placedBet} />
          })}
        </div>
      </div>
    )
  }
}

module.exports = BettingSlip

function PlacedBets(props) {
  return (
    <div className="bet-slip-placed-bet-event">
      <h3> { props.placedBet.event } </h3>
      <p> { props.placedBet.name } </p>
      <p> Stake: £{ props.placedBet.stake.toFixed(2) } </p>
      <p> Returns: £{ parseFloat((props.placedBet.odds.numerator / props.placedBet.odds.denominator)*props.placedBet.stake + +props.placedBet.stake).toFixed(2) } </p>
      <p> Transaction ID: { props.placedBet.transaction_id } </p>
    </div>
  )
}

