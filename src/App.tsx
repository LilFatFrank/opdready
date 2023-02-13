import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './style/app.scss'
import Wrapper from './wrapper'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Wrapper />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
