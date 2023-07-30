import styles from './AuthPage.module.scss'

export const AuthPage = ({ type }: { type: 'login' | 'registration' }) => {
    const currentAuthTitle = type === 'login' ? 'Sign In' : 'Log In'

    return (
        <div className="container">
            <h1>{currentAuthTitle}</h1>
            <form className="form-group">
                <label className={styles.label}>
                    Input your username
                    <input type="text" className="form-control" />
                </label>
                <label className="auth-label">
                    Input your password
                    <input type="text" className="form-control" />
                </label>
                <button className="btn btn-primary auth-btn">
                    {currentAuthTitle}
                </button>
            </form>
        </div>
    )
}
