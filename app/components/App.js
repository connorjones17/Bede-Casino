var React = require('react')
var Markets = require('./Markets')

class App extends React.Component {
  render() {
    return (
      <div>
        <Markets />
      </div>
    )
  }
}

module.exports = App