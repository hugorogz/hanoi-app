import './App.css';
import HanoiForm from './components/HanoiForm';
import HanoiVisualization from './components/HanoiVisualization';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Hanoi App.</h1>
      </header>

      <HanoiForm />

      <HanoiVisualization />
    </div>
  );
}

export default App;
