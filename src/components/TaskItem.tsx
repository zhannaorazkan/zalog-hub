import { useState } from 'react';
import type { Task } from '../types';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed) onEdit(task.id, trimmed);
    else setDraft(task.text);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(task.text);
    setEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <button
        className="check"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as active' : 'Mark as completed'}
      >
        {task.completed && '✓'}
      </button>

      {editing ? (
        <input
          className="edit-input"
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save();
            if (e.key === 'Escape') cancel();
          }}
        />
      ) : (
        <span className="task-text">{task.text}</span>
      )}

      <div className="actions">
        <button className="icon-btn edit" onClick={() => setEditing(true)} aria-label="Изменить">
          ✎
        </button>
        <button className="icon-btn delete" onClick={() => onDelete(task.id)} aria-label="Удалить">
          🗑
        </button>
      </div>
    </li>
  );
}