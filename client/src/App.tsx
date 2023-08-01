import React from 'react'
import { Header } from './components/Header/Header'
import { AuthPage } from './components/Auth/AuthPage'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { useStore } from 'effector-react'
import { $auth } from './context/auth'

function App() {
    const isLoggedIn = useStore($auth)

    return (
        <div className="App">
            <Header />
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? (
                                <Navigate to={'/costs'} />
                            ) : (
                                <Navigate to={'/login'} />
                            )
                        }
                    />
                    <Route
                        path="/registration"
                        element={
                            isLoggedIn ? (
                                <Navigate to={'/costs'} />
                            ) : (
                                <AuthPage type="registration" />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            isLoggedIn ? (
                                <Navigate to={'/costs'} />
                            ) : (
                                <AuthPage type="login" />
                            )
                        }
                    />
                    <Route
                        path="/costs"
                        element={
                            isLoggedIn ? (
                                <div className="container">
                                    <h1>A list of costs</h1>
                                </div>
                            ) : (
                                <Navigate to={'/login'} />
                            )
                        }
                    />
                </Routes>
            </Router>
        </div>
    )
}

export default App
