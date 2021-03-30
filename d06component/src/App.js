import './App.css';
//import * from './components/Demo';
import { Demo, Hello } from './components/Demo';

function App() {
    return (
        <div className="App">
            <Demo name="Trần Tèo" />
            <Hello name="Lý Tú" />
        </div>
    );
}

export default App;
