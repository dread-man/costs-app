import React from 'react'
import { Header } from './components/Header/Header'
import { AuthPage } from './components/Auth/AuthPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Header />
			<Router>
				<Routes>
					<Route path='/' element={<AuthPage type='login'/>}/>
					<Route path='/registration' element={<AuthPage type='registration'/>}/>
					<Route path='/login' element={<AuthPage type='login'/>}/>
					<Route path='/costs' element={<div className="container"><h1>A list of costs</h1></div>}/>
				</Routes>
			</Router>
        </div>
    )
}

export default App
