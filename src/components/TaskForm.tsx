import { useState } from 'react';

type Props = {
  onAdd: (text: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите новую задачу..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn-primary" disabled={!text.trim()}>
        Добавить
      </button>
    </form>
  );
}