export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task)}
          className={`h-10 w-16 rounded-full text-xs font-semibold uppercase tracking-wide transition ${
            task.status === "completed"
              ? "bg-emerald-500 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {task.status === "completed" ? "Done" : "Todo"}
        </button>
        <div>
          <h3
            className={`text-base font-semibold ${
              task.status === "completed" ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {task.title}
          </h3>
          {task.description && <p className="mt-1 text-sm text-slate-500">{task.description}</p>}
          <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs uppercase tracking-wide text-slate-500">
            {task.status}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task)}
          className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
