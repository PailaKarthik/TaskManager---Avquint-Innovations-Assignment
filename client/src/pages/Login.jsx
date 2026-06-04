import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 lg:grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-white/80 p-10 shadow-xl backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">TaskFlow</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-500">Sign in to manage your tasks with focus.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="rounded-xl bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
                placeholder="Your secure password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500 disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-sm text-slate-600">
            New here? <Link className="font-semibold text-teal-600" to="/register">Create an account</Link>
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-slate-900 p-10 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">Stay in control</h2>
          <p className="mt-3 text-sm text-teal-100">
            Organize tasks, set priorities, and track progress in one place.
          </p>
          <div className="mt-8 space-y-4 text-sm text-teal-100">
            <div className="rounded-2xl bg-white/10 p-4">Quick search and smart filters.</div>
            <div className="rounded-2xl bg-white/10 p-4">Fast edits and instant status updates.</div>
            <div className="rounded-2xl bg-white/10 p-4">Built with the MERN stack.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
