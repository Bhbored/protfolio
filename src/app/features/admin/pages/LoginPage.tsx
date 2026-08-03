import { useState, type SyntheticEvent } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { Shield, Loader2 } from "lucide-react"
import { useAuth } from "../../../providers/AuthProvider"

export default function LoginPage() {
  const { user, loading, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const result = await login(email.trim(), password)
    setSubmitting(false)

    if (result.error) {
      setError(result.error)
      setPassword("")
    } else {
      navigate("/admin", { replace: true })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-white/10 bg-surface-container-highest p-6 shadow-glow-cyan"
        noValidate
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Shield className="size-10 text-primary" aria-hidden />
          <h1 className="font-headline text-lg font-bold text-on-surface">
            Admin Access
          </h1>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            Sign in with your credentials
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-6 animate-spin text-primary" aria-label="Loading" />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="mb-1 block font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full bg-transparent border-b border-outline-variant py-3 font-body text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none"
                aria-label="Email"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-1 block font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full bg-transparent border-b border-outline-variant py-3 font-body text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none"
                aria-label="Password"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-primary to-secondary py-3 font-headline text-sm font-bold uppercase tracking-tight text-background transition-all duration-300 hover:scale-102 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {error && (
          <p className="mt-4 text-center font-label text-sm text-secondary" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  )
}
