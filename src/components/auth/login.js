import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/authManager"

export const Login = ({ setToken, setUserId }) => {
    const email = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const [isUnsuccessful, setIsUnsuccessful] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()

        const user = {
            email: email.current.value,
            password: password.current.value
        }
        loginUser(user).then(res => {
            if ("valid" in res && res.valid) {
                setToken(res.token)
                setUserId(res.user)
                navigate("/Home")
            }
            else {
                setIsUnsuccessful(true)
            }
        })
    }

    return (
        <section className="columns is-centered">
            <form className="column is-two-thirds" onSubmit={handleLogin}>
                <h1 className="title">Magical Day</h1>
                <p className="subtitle">Please sign in</p>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="email" ref={email} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" ref={password} />
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit" >Submit</button>
                    </div>
                    <div className="control">
                        <Link to="/register" className="button is-link is-light">Cancel</Link>
                    </div>
                </div>
                {
                    isUnsuccessful ? <p className="help is-danger">Email or password not valid</p> : ''
                }
            </form>
        </section>
    )
}