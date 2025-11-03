import { Route,Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Transfer from "./pages/Transfer";
import Contact from './pages/Contact';
import About from './pages/About';

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
