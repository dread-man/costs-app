import React from 'react'
import { Header } from './components/Header/Header'
import { AuthPage } from './components/Auth/AuthPage'

function App() {
    return (
        <div className="App">
            <Header />
			<AuthPage type='login'/>
        </div>
    )
}

export default App
