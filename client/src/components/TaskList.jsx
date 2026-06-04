import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, loading, error, onEdit, onDelete, onToggle }) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-500">
        Loading tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
        {error}
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-500">
        No tasks yet. Add your first task to get started.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
