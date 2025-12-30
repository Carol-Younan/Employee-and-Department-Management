import Nav from './Components/Nav';
import Emp from './Emp'
import Home from './Home'
import Dept from './Dept'
import Count from './Count'
import EmpInDept from './EmpInDept';
import { BrowserRouter , Routes , Route } from 'react-router-dom';


function App() {
  return(
    <BrowserRouter>
    <Nav/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/emp' element={<Emp/>}/>
        <Route path="/dept" element={<Dept/>} />
        <Route path='/deptEmp' element={<EmpInDept/>}/>
        <Route path="/deptEmpCount" element={<Count/>}/>
        <Route/>
    </Routes>
    </BrowserRouter>
  )
}


export default App
