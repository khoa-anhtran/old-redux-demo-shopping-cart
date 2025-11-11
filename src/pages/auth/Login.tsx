import useUserInfo from "@/hooks/useUserInfo"
import { useCallback, useState, useTransition } from "react"
import { Link } from "react-router-dom"

export default function Login() {
    const { loginAction } = useUserInfo()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false);

    const onLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            const err = await loginAction({ email, password });
            if (err) setError(err);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Unexpected error");
        } finally {
            setSubmitting(false);
        }
    }, [email, password, loginAction]);

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
                        disabled={submitting}
                    >
                        {submitting ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>

                <div style={{ color: 'red' }}>{error && error}</div>

                <p className="login__hint">
                    Don't have an account? <Link to={"/signup"}>Sign up</Link>
                </p>
            </div>
        </div >
    )
}