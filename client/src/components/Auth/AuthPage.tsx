import { Link } from 'react-router-dom'
import styles from './AuthPage.module.scss'

export const AuthPage = ({ type }: { type: 'login' | 'registration' }) => {
    const currentAuthTitle = type === 'login' ? 'Sign In' : 'Register'

    return (
        <div style={{ marginTop: '20px' }} className="container">
            <h1>{currentAuthTitle}</h1>
            <form className="form-group">
                <label className={styles.authLabel}>
                    Input your username
                    <input type="text" className="form-control" />
                </label>
                <label className={styles.authLabel}>
                    Input your password
                    <input type="text" className="form-control" />
                </label>
                <button className="btn btn-primary auth-btn">
                    {currentAuthTitle}
                </button>
            </form>

            {type === 'login' ? (
                <div>
                    <span className={styles.questionText}>Don't have an account?</span>{' '}
                    <Link to={'/registration'}>Register</Link>
                </div>
            ) : (
                <div>
                    <span  className={styles.questionText}>Have an account?</span>{' '}
                    <Link to={'/login'}>Log In</Link>
                </div>
            )}
        </div>
    )
}
