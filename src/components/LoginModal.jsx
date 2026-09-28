import { useState, useEffect, useRef } from "react"

export default function LoginModal({ isOpen, onClose, currentUser, onLogin, onLogout }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [forgotMsg, setForgotMsg] = useState("")
  const emailInputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setError("")
      setForgotMsg("")
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose()
      }
      window.addEventListener("keydown", handleKeyDown)
      // Focus email input
      setTimeout(() => {
        if (emailInputRef.current && !currentUser) {
          emailInputRef.current.focus()
        }
      }, 50)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, currentUser])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setForgotMsg("")

    if (!email.trim()) {
      setError("Please enter your email or username.")
      return
    }
    if (!password) {
      setError("Please enter your password.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const name = email.includes("@") ? email.split("@")[0] : email
      const capitalized = name.charAt(0).toUpperCase() + name.slice(1)
      onLogin({
        name: capitalized || "Customer",
        email: email.trim(),
      })
    }, 600)
  }

  const handleDemoFill = () => {
    setEmail("alex.foodie@littlelemon.com")
    setPassword("lemon123")
    setError("")
    setForgotMsg("")
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setForgotMsg("Please enter your email address above first.")
    } else {
      setForgotMsg(`Password reset link sent to ${email.trim()}!`)
    }
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close login dialog"
        >
          &times;
        </button>

        {currentUser ? (
          <div className="login-success-view">
            <div className="login-avatar-circle">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <h2 id="login-modal-title">Welcome back, {currentUser.name}!</h2>
            <p className="login-subtitle">
              You are signed in as <strong>{currentUser.email}</strong>.
            </p>
            <div className="login-modal-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={onClose}
              >
                Continue Browsing
              </button>
              <button
                type="button"
                className="btn-secondary-outline"
                onClick={() => {
                  onLogout()
                  setEmail("")
                  setPassword("")
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="login-modal-header">
              <img
                src="/icons_assets/Logo.svg"
                alt="Little Lemon Logo"
                className="login-modal-logo"
              />
              <h2 id="login-modal-title">Sign In to Little Lemon</h2>
              <p className="login-subtitle">
                Access your table reservations, order history, and exclusive specials.
              </p>
            </div>

            {error && (
              <div className="login-alert login-alert-error" role="alert">
                {error}
              </div>
            )}

            {forgotMsg && (
              <div className="login-alert login-alert-info" role="status">
                {forgotMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form" noValidate>
              <div className="login-field-group">
                <label htmlFor="login-email">Email or Username</label>
                <input
                  ref={emailInputRef}
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="login-field-group">
                <div className="login-label-row">
                  <label htmlFor="login-password">Password</label>
                  <a
                    href="#forgot"
                    onClick={handleForgotPassword}
                    className="login-link"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="login-password-wrapper">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="login-options-row">
                <label className="login-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="login-demo-btn"
                  title="Fill in demo credentials"
                >
                  Fill Demo
                </button>
              </div>

              <button
                type="submit"
                className="btn-primary login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              <div className="login-footer-text">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="login-link-btn"
                  onClick={handleDemoFill}
                >
                  Create one / Try Demo
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
