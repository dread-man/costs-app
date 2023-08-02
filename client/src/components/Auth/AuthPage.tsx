import { useState, useRef, MutableRefObject } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthClient } from '../../api/authClient'
import { Spinner } from '../Spinner/Spinner'
import { handleAlertMessage } from '../../utils/auth'

import styles from './AuthPage.module.scss'

export const AuthPage = ({ type }: { type: 'login' | 'registration' }) => {
    const navigate = useNavigate()

    const [spinner, setSpinner] = useState<boolean>(false)
    const usernameRef = useRef() as MutableRefObject<HTMLInputElement>
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>
    const currentAuthTitle = type === 'login' ? 'Sign In' : 'Register'

    const handleAuthResponse = (
        result: boolean | undefined,
        navigatePath: string,
        alertText: string
    ) => {
        if (!result) {
            setSpinner(false)
            return
        }
		// usernameRef.current.value = ''
		// passwordRef.current.value = ''

        setSpinner(false)
        navigate(navigatePath)
        handleAlertMessage({ alertText: alertText, alertStatus: 'success' })
    }

    const handleLogin = async (username: string, password: string) => {
        if (!username || !password) {
            setSpinner(false)
            handleAlertMessage({
                alertText: 'Fill all inputs',
                alertStatus: 'warning',
            })
            return
        }

        const result = await AuthClient.login(username, password)
		handleAuthResponse(result, '/costs', 'Logged In')
    }

    const handleRegistration = async (username: string, password: string) => {	
        if (!username || !password) {
            setSpinner(false)
            handleAlertMessage({
                alertText: 'Fill all inputs',
                alertStatus: 'warning',
            })
            return
        }

		if(typeof Number(username) === 'number') {
			setSpinner(false)
            handleAlertMessage({
                alertText: "The username can't be a number",
                alertStatus: 'warning',
            })
            return
		} 

        if (password.length < 4) {
            setSpinner(false)
            handleAlertMessage({
                alertText: 'Password must be more than 4 characters',
                alertStatus: 'warning',
            })
            return
        }

        const result = await AuthClient.registration(username, password)
        handleAuthResponse(result, '/login', 'Register success')
    }

    const handleAuth: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        setSpinner(true)

        switch (type) {
            case 'login':
                handleLogin(
                    usernameRef.current.value,
                    passwordRef.current.value
                )
                break
            case 'registration':
                handleRegistration(
                    usernameRef.current.value,
                    passwordRef.current.value
                )
                break
            default:
                break
        }
    }

    return (
        <div style={{ marginTop: '20px' }} className="container">
            <h1>{currentAuthTitle}</h1>
            <form onSubmit={handleAuth} className="form-group">
                <label className={styles.authLabel}>
                    Input your username
                    <input
                        ref={usernameRef}
                        type="text"
                        className="form-control"
                    />
                </label>
                <label className={styles.authLabel}>
                    Input your password
                    <input
                        ref={passwordRef}
                        type="password"
                        className="form-control"
                    />
                </label>
                <button className={`btn btn-primary ${styles.authBtn}`}>
                    {spinner ? <Spinner top={5} left={20} /> : currentAuthTitle}
                </button>
            </form>

            {type === 'login' ? (
                <div>
                    <span className={styles.questionText}>
                        Don't have an account?
                    </span>{' '}
                    <Link to={'/registration'}>Register</Link>
                </div>
            ) : (
                <div>
                    <span className={styles.questionText}>
                        Have an account?
                    </span>{' '}
                    <Link to={'/login'}>Log In</Link>
                </div>
            )}
        </div>
    )
}
