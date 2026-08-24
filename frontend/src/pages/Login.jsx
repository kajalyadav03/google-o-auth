import { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8000/api/auth/google";
  };

  return (
    <main className="login-page">

      {/* LEFT SIDE */}
      <section className="login-visual">

        <div className="visual-logo">
          <div className="visual-logo-mark">
            A
          </div>

          AuthHub
        </div>

        <div className="visual-content">
          <h2>
            Your account.
            <br />
            <span>Your space.</span>
          </h2>

          <p>
            A simple and secure way to access
            your account. Sign in with your
            email or continue with Google.
          </p>
        </div>

        <div className="visual-footer">
          © 2026 AuthHub. Secure authentication.
        </div>

      </section>

      {/* RIGHT SIDE */}
      <section className="login-section">

        <div className="login-card">

          <div className="brand">
            <h1>Welcome back</h1>

            <p>
              Sign in to continue to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-button"
            onClick={handleGoogleLogin}
          >
            <span className="google-logo">
              G
            </span>

            Continue with Google
          </button>

          {message && (
            <p className="error-message">
              {message}
            </p>
          )}

          <p className="footer-text">
            Protected with secure authentication
          </p>

        </div>

      </section>

    </main>
  );
}

export default Login;