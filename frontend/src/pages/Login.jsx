import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isError, isLoading, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
        }

        dispatch(reset())
    }, [navigate, dispatch, user, isError, message, isSuccess])

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please login to get support</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login