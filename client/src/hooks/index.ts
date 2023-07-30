
import { useEffect, useState } from 'react'

export const useTheme = () => {
    const [theme, setTheme] = useState(
        JSON.parse(localStorage.getItem('theme') as string) || 'dark'
    )
    const darkTheme: string =
        'https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/css/bootstrap-dark.min.css'
    const lightTheme: string =
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'

    const setCurrentMode = (theme: string) => {
        const link = document.getElementById('theme-link') as HTMLLinkElement
        link.href = theme === 'dark' ? darkTheme : lightTheme
    }

    const switchTheme = () => {
        const inverseMode = theme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', JSON.stringify(inverseMode))

        setCurrentMode(theme)
        setTheme(inverseMode)
    }

    useEffect(() => {
        setCurrentMode(theme)
    }, [theme])

    return {
        switchTheme,
        theme,
    }
}
