import useUserInfo from "@/hooks/useUserInfo"
import { useCallback, useState, useTransition } from "react"
import { Link } from "react-router-dom"

export default function Register() {
    const { registerAction } = useUserInfo()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    const [isLoading, startTransition] = useTransition()

    const onRegister = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()

        startTransition(async () => {
            const err = await registerAction({ email, password })
            if (err)
                setError(err)
        })
    }, [email, password, registerAction])

    return (
        <div className="login">
            <div className="login__card" role="region" aria-label="Login">
                <h1 className="login__title">Register Form</h1>

                <form onSubmit={onRegister} className="login__form">
                    <div className="login__field">
                        <label htmlFor="email" className="login__label">Email</label>
                        <input id="email" required className="login__input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="login__field">
                        <label htmlFor="password" className="login__label">Password</label>
                        <input type="password" id="password" required className="login__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="login__submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing up…' : 'Sign up'}
                    </button>
                </form>

                <div style={{ color: 'red' }}>{error != undefined && error}</div>

                <p className="login__hint">
                    Already have an account? <Link to={"/login"}>Sign in</Link>
                </p>
            </div>
        </div>
    )
}