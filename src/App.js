import React, { Component } from 'react';
import Person from './Person/Person';
import Person2 from './Person/Person2';
import './App.css';

class App extends Component {
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasd2', name: 'Manu', age: 29 },
      { id: 'vfdf3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPerson: false
  }

  switchPersonToggle = () => {
    this.state.showPerson = this.setState({ showPerson: !this.state.showPerson });
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    })

  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = { // state 요소의 object는 직접건드리지않고, 복사해서 쓰는게 좋다. 
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;

    const persons = [...this.state.persons]; // state꺼 복사해서
    persons[personIndex] = person; // 새로 바뀐 객체를 복사본 어레이에 넣어준다.

    this.setState({ persons: persons })
  }

  deletePersonHandler = (personIndex) => {
    this.state.persons.splice(personIndex, 1);
    this.setState({ persons: this.state.persons });
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'

    };
    let person = null;

    if (this.state.showPerson) {
      person = (
        <div>
          {this.state.persons.map((person, index) => {

            return <Person click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button style={style} onClick={this.switchPersonToggle}>Switch Name</button>
        {person}

      </div>
    );
  }
}

export default App;
