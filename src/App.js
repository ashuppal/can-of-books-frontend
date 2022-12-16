import React from 'react'
import Header from './Header'
import Footer from './Footer'
import BestBooks from './BestBooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom'
import Profile from './About'




class App extends React.Component {
  render () {
    return (
      <>
        <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
          <Header />
          <Routes>
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
            <Route path='/about' element={<Profile />}></Route>
            <Route exact path='/' element={<BestBooks />}></Route> 
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App
