import React from 'react';
import '../styles/App.css';

const App: React.FC = () => {
  const onClick = (name: string) => {
    console.log(`${name} says hello`)
  }

  return (
    <div className="App">
      React typescript practice
      <Greetings name='Saebom' onClick={onClick}/>
    </div>
  );
}

type GreetingsProps = {
  name: string,
  mark: string,
  optional?: string //optional props
  onClick: (name: string) => void //return nothing
}; 

// FC는 사용은 권장하지 않는다(defaultProps를 받지 못함)
const Greetings = ({name, mark, optional, onClick}: GreetingsProps) => {
  const handleClick = () => onClick(name)

  return <div>
    HELLO, {name} {mark}
    { optional && <p>{optional}</p>}
    <button onClick={handleClick}>Click ME</button>
  </div>
}

Greetings.defaultProps = {
  mark: '!'
}

export default App;
