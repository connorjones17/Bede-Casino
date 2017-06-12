var React = require('react')
var BettingEvent = require('./BettingEvent')

class BettingService extends React.Component {

  constructor() {
    super()

    this.state = {
      events: {},
    }
  }

  componentDidMount() {
    var events = this.state.events

    this.props.bets.map((bet) => {
      events[bet.event] = (events[bet.event] === undefined) ? [] : events[bet.event]
      events[bet.event].push(bet)
    })

    this.setState(() => {
      return {
        events: events
      }
    })
  }

  render() {
    if (this.state.events == {}) return <div className="loading-content"> Loading... </div>
    var events = this.state.events
    var bettingEvents = []

    Object.keys(this.state.events).forEach((event) => {
      bettingEvents.push(
        <BettingEvent
          bets={ events[event] }
          key={ event }
          onSelect={ this.props.handleOpenBet }
        />
      )
    })

    return (
      <div className="betting-event-container">
        { bettingEvents }
      </div>
    )
  }
}

module.exports = BettingService
