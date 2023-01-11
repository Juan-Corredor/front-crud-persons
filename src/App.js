import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListPersons from './components/ListPersons';
//Styles
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPersons />} />          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
