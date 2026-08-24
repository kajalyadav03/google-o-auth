import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          "https://google-o-auth-moel.onrender.com/api/auth/me",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message);
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong");
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://google-o-auth-moel.onrender.com/api/auth/logout"
        ,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        window.location.href = "/#/login";
      }
    } catch (error) {
      console.error(error);
      setMessage("Logout failed");
    }
  };

  if (message) {
    return (
      <div className="dashboard-error">
        {message}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-loading">
        Loading your dashboard...
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div className="dashboard-page">

      {/* NAVBAR */}
      <nav className="dashboard-nav">

        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">
            A
          </div>

          AuthHub
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
          style={{
            width: "auto",
            marginTop: 0,
            padding: "0 18px",
          }}
        >
          Logout
        </button>

      </nav>

      {/* MAIN */}
      <main className="dashboard-main">

        {/* WELCOME */}
        <section className="welcome-section">
          <h1>
            Welcome back, {user.name} 👋
          </h1>

          <p>
            Here's a quick look at your account.
          </p>
        </section>

        {/* CARDS */}
        <div className="dashboard-grid">

          {/* ACCOUNT CARD */}
          <div className="dashboard-card">

            <h2 className="card-title">
              Account information
            </h2>

            <div className="profile-header">

              <div className="profile-avatar">
                {initials}
              </div>

              <div>
                <h3 className="profile-name">
                  {user.name}
                </h3>

                <p className="profile-email">
                  {user.email}
                </p>
              </div>

            </div>

            <div className="account-details">

              <div className="account-row">
                <span className="account-label">
                  Full name
                </span>

                <span className="account-value">
                  {user.name}
                </span>
              </div>

              <div className="account-row">
                <span className="account-label">
                  Email address
                </span>

                <span className="account-value">
                  {user.email}
                </span>
              </div>

              <div className="account-row">
                <span className="account-label">
                  Login method
                </span>

                <span className="login-method">
                  <span className="method-dot"></span>

                  {user.authProvider === "google"
                    ? "Google"
                    : "Email & Password"}
                </span>
              </div>

            </div>

          </div>

          {/* STATUS CARD */}
          <div className="dashboard-card status-card">

            <div>

              <div className="status-top">

                <div>
                  <p className="status-label">
                    ACCOUNT STATUS
                  </p>

                  <h2 className="status-title">
                    Active
                  </h2>
                </div>

                <div className="status-icon">
                  ✓
                </div>

              </div>

              <p className="status-description">
                Your account is authenticated and
                ready to use. You can safely access
                your protected dashboard.
              </p>

            </div>

          </div>

        </div>

        <footer className="dashboard-footer">
  <span>Made by Kajal Yadav</span>

  <span className="footer-separator">·</span>

  <a
    href="https://github.com/kajalyadav03"
    target="_blank"
    rel="noopener noreferrer"
  >
    GitHub ↗
  </a>
</footer>

      </main>

    </div>
  );
}

export default Dashboard;