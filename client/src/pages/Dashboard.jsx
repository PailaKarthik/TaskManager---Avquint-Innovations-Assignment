import { useEffect, useMemo, useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState(null);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === "completed").length;
    return { total, completed, pending: total - completed };
  }, [tasks]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.getTasks(token, { search, status });
      setTasks(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadTasks();
    }
  }, [token, search, status]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(searchInput.trim());
  };

  const handleSave = async (payload) => {
    try {
      setError("");
      if (editing) {
        await api.updateTask(token, editing._id, payload);
      } else {
        await api.createTask(token, payload);
      }
      setEditing(null);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (task) => {
    try {
      await api.deleteTask(token, task._id);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (task) => {
    try {
      await api.toggleTask(token, task._id);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">Dashboard</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Welcome, {user?.name}</h1>
            <p className="text-sm text-slate-500">Stay on top of your work today.</p>
          </div>
          <button
            onClick={logout}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Logout
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{stats.total}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Completed</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-600">{stats.completed}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Pending</p>
            <p className="mt-2 text-2xl font-semibold text-amber-600">{stats.pending}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Your tasks</h2>
              <p className="text-sm text-slate-500">Search, filter, and manage quickly.</p>
            </div>
            <form onSubmit={handleSearch} className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
                placeholder="Search tasks"
              />
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <button
                type="submit"
                className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500"
              >
                Search
              </button>
            </form>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
            <TaskForm initialTask={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
            <TaskList
              tasks={tasks}
              loading={loading}
              error={error}
              onEdit={setEditing}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
