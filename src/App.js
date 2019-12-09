import React from 'react';
import './App.css';
import './bootstrap.css';
// import FirstComponent from './components/learning-examples/FirstComponent';
// import SecondComponent from './components/learning-examples/SecondComponent';
// import ThirdComponent from './components/learning-examples/ThirdComponent';
// import Counter from './components/counter/Counter';
import MortgageApp from './components/mortgage/MortgageApp';

function App() {
    return (
      <div className="App">
        {/*<Counter/>*/}
        <MortgageApp/>
      </div>
    );
}



/* class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
        My Hello World
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
      </div>
    );
  }
}
 */

export default App;
