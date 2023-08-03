import { Header } from './components/Header/Header'
import { AuthPage } from './components/Auth/AuthPage'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { useStore } from 'effector-react'
import { $auth, setAuth, setUsername } from './context/auth'
import { $alert } from './context/alert'
import { Alert } from './components/Alert/Alert'
import { CostsPage } from './components/CostsPage/CostsPage'
import { useEffect } from 'react'
import { getAuthDataFromLS, removeUser } from './utils/auth'

function App() {
    const isLoggedIn = useStore($auth)
	const alert = useStore($alert)

	useEffect(() => {
		const auth = getAuthDataFromLS()

		if(!auth || !auth.access_token || !auth.refresh_token) {
			removeUser()
		} else {
			setAuth(true)
			setUsername(auth.username)
		}
	}, [])

    return (
        <div className="App">
            <Header />
			{alert.alertText && <Alert props={alert}/>}
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
                              <CostsPage/>
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
