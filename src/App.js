import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListPersons from './components/ListPersons';
import FormPerson from './components/FormPerson';

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
          <Route path="/create-person" element={<FormPerson />} />
          <Route path="/edit-person/:id" element={<FormPerson />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
