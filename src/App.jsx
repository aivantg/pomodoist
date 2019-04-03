import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import './styles/App.css';
import { ReactComponent as EmptyStateIllustration } from './icons/drawkit-nature-man-colour.svg';
import { ReactComponent as Archive } from './icons/archive.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 1,
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      id: nextItemId,
      description,
      sessionsCompleted: 0,
      isCompleted: false,
    };
    this.setState((prevState => ({
      items: prevState.items.concat(newItem),
      nextItemId: prevState.nextItemId + 1,
    })));
  }

  clearCompletedItems() {
    this.setState(prevState => ({
      items: prevState.items.filter(item => !item.isCompleted),
    }));
  }

  increaseSessionsCompleted(itemId) {
    this.setState((prevState) => { // TODO: refactor this
      const newItems = prevState.items.map((item) => {
        if (item.id === itemId) {
          item.sessionsCompleted += 1;
        }
        return item;
      });

      return ({ items: newItems });
    });
  }

  toggleItemIsCompleted(itemId) {
    this.setState((prevState) => { // TODO: refactor this.
      const newItems = prevState.items.map((item) => {
        if (item.id === itemId) {
          item.isCompleted = !item.isCompleted;
        }
        return item;
      });
      return ({ items: newItems });
    });
  }

  startSession(id) {
    this.setState({
      sessionIsRunning: true,
      itemIdRunning: id,
    });
  }

  render() {
    const { items, sessionIsRunning, itemIdRunning } = this.state;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            <button className="clear-button" type="button" onClick={this.clearCompletedItems}>
              <Archive />
            </button>
          </header>
          {sessionIsRunning && (
            <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              isPlaying
              // Why use key? This is a fully uncontrolled component with a key
              // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component
              // Timer accepts a isPlaying prop for the initial value of the isPlaying state variable
              // and then ignores every subsequent change to that prop.
              key={itemIdRunning}
            />
          )}
          {
            (items && items.length)
              ?
              (
                <div className="items-container">
                  {items.map(({
                    id,
                    description,
                    sessionsCompleted,
                    isCompleted,
                  }) => (
                    <TodoItem
                      key={id}
                      description={description}
                      sessionsCompleted={sessionsCompleted}
                      isCompleted={isCompleted}
                      startSession={() => this.startSession(id)}
                      toggleIsCompleted={() => this.toggleItemIsCompleted(id)}
                    />
                  ))}
                </div>
              )
              : (
                <div className="empty-state-container">
                  <EmptyStateIllustration />
                  <p className="empty-state-text">Your todolist is empty</p>
                </div>
              )
          }
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
