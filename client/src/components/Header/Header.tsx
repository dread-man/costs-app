import { $auth, $username } from '../../context/auth'
import { useStore } from 'effector-react'
import { useTheme } from '../../hooks'
import { removeUser } from '../../utils/auth'

export const Header = () => {
    const { switchTheme, theme } = useTheme()
    const username = useStore($username)
    const loggedIn = useStore($auth)

    return (
        <header
            className={`navbar navbar-dark bg-${
                theme === 'dark' ? 'dark' : 'primary'
            }`}
        >
            <div className="container">
                <h1 style={{ color: 'white' }}>Costs App</h1>
                {username.length ? (
                    <h2 style={{ color: 'white' }}>{username.toUpperCase()}</h2>
                ) : (
                    ''
                )}
                <button
                    onClick={switchTheme}
                    className={`btn btn-${theme === 'dark' ? 'light' : 'dark'}`}
                >
                    {theme === 'dark' ? 'Go light' : 'Go dark'}
                </button>
                {loggedIn && (
                    <button onClick={removeUser} className="btn btn-primary">
                        Log out
                    </button>
                )}
            </div>
        </header>
    )
}
