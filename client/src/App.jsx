import History from './Components/History'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import About from './Components/About'
import Timer from './Components/Timer'

export default function App(){
    return(
        <>
        <Navbar></Navbar>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Timer></Timer>}></Route>
                <Route path='/history' element={<History></History>}></Route>
                <Route path='/about' element={<About></About>}></Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}

