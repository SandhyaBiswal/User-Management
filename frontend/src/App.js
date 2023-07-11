import './App.css';
import Home from './Home';
import Readuser from './Readuser';
import Updateuser from './Updateuser';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
       <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/readuser/:id' element={<Readuser></Readuser>}></Route>
        <Route path='/updateuser/:id' element={<Updateuser></Updateuser>}></Route>
       </Routes>
    </div>
  );
}


export default App;
