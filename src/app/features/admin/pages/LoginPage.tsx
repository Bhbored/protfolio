import { useState, type SyntheticEvent } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { Shield, Loader2, ArrowLeft, Lock } from "lucide-react"
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
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background p-4 mesh-gradient">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" aria-hidden />

      <Link
        to="/"
        className="absolute top-6 left-6 z-10 inline-flex cursor-pointer items-center gap-2 rounded-md border border-outline-variant/30 bg-surface-container-high px-4 py-2.5 font-label text-xs uppercase tracking-widest text-primary transition-all duration-200 hover:border-primary/50 hover:shadow-glow-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to website
      </Link>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-surface-container-highest/90 p-8 shadow-glow-cyan backdrop-blur-md"
          noValidate
        >
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <div className="flex size-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 shadow-glow-cyan">
              <Shield className="size-8 text-primary" aria-hidden />
            </div>
            <div>
              <h1 className="font-headline text-2xl font-bold text-on-surface">
                Admin Access
              </h1>
              <p className="mt-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Sign in with your credentials
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2
                className="size-7 animate-spin text-primary"
                aria-label="Loading"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-2 block font-label text-xs uppercase tracking-widest text-on-surface-variant"
                >
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError(null)
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoFocus
                  required
                  className="w-full rounded-md border border-outline-variant/40 bg-surface-container-low/50 px-4 py-3.5 font-body text-on-surface placeholder:text-on-surface-variant/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
                  aria-label="Email"
                />
              </div>
              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-2 block font-label text-xs uppercase tracking-widest text-on-surface-variant"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError(null)
                    }}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-md border border-outline-variant/40 bg-surface-container-low/50 px-4 py-3.5 pr-11 font-body text-on-surface placeholder:text-on-surface-variant/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
                    aria-label="Password"
                  />
                  <Lock
                    className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-on-surface-variant"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || loading || !email.trim() || !password}
            className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-linear-to-r from-primary to-secondary py-3.5 font-headline text-sm font-bold uppercase tracking-tight text-background transition-all duration-300 hover:scale-102 hover:shadow-glow-cyan active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
            <p
              className="mt-4 rounded-md border border-secondary/30 bg-secondary/10 px-3 py-2 text-center font-label text-sm text-secondary"
              role="alert"
            >
              {error}
            </p>
          )}
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex cursor-pointer items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Return to portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
