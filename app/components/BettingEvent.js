var React = require('react')

class BettingEvent extends React.Component {

  render() {
    return (
      <ul>
        <h1 className="betting-service-event-header"> { this.props.bets[0].event } </h1>
        { this.props.bets.map((bet) => {

          return <BettingItem
            key={ bet.bet_id }
            bet={ bet }
            onSelect={ this.props.onSelect }
          />
        })}
      </ul>
    )
  }
}

module.exports = BettingEvent

function BettingItem (props) {
  return (
    <li className="betting-event-list-item" key={ props.bet.bet_id } >
      { props.bet.name }

      <button className="betting-event-list-item-button" onClick={ props.onSelect.bind(null, props.bet) } >

        { (props.bet.odds.numerator == props.bet.odds.denominator)
          ? 'Evens'

          : props.bet.odds.numerator + ' / ' + props.bet.odds.denominator
        }
      </button>

    </li>
  )
}
