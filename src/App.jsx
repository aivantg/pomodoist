import React from 'react';
import Timer from './components/Timer';
import SessionsCompletedCounter from './components/SessionsCompletedCounter';
import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);

    this.state = {
      sessionsCompleted: 0,
    };
  }

  increaseSessionsCompleted() {
    this.setState(prevState => ({ sessionsCompleted: prevState.sessionsCompleted + 1 }));
  }

  render() {
    const { sessionsCompleted } = this.state;
    console.log(sessionsCompleted);
    return (
      <div className="container">
        <h1 className="header">Today</h1>
        <Timer mode="WORK" onSessionComplete={this.increaseSessionsCompleted} />
        <SessionsCompletedCounter sessionsCompleted={sessionsCompleted} />
      </div>
    );
  }
}

export default App;
