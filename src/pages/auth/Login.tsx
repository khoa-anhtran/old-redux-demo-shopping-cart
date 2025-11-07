import useUserInfo from "@/hooks/useUserInfo"
import { useCallback, useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
    const { loginAction } = useUserInfo()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const onLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            await loginAction({ email, password })
            setLoading(false)
        }
        catch (err) {
            setError(error)
        }
    }, [email, password, loginAction])

    return (
        <div className="login">
            <div className="login__card" role="region" aria-label="Login">
                <h1 className="login__title">Login Form</h1>

                <form onSubmit={onLogin} className="login__form">
                    <div className="login__field">
                        <label htmlFor="email" className="login__label">Email</label>
                        <input type="email" id="email" className="login__input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="login__field">
                        <label htmlFor="password" className="login__label">Password</label>
                        <input type="password" id="password" className="login__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="login__submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>

                <div style={{ color: 'red' }}>{error != null && error}</div>

                <p className="login__hint">
                    Don't have an account? <Link to={"/signup"}>Sign up</Link>
                </p>
            </div>
        </div >
    )
}