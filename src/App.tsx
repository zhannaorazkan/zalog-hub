import { useState } from 'react';
import type { Filter, Task } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskItem from './components/TaskItem';
import Footer from './components/Footer';

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<Filter>('all');

  const addTask = (text: string) => {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), text, completed: false }]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id: string, text: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <h1>Задачи</h1>

      <TaskForm onAdd={addTask} />
      <FilterBar filter={filter} onChange={setFilter} />

      {visibleTasks.length === 0 ? (
        <p className="empty">Пока нет задач.</p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </ul>
      )}

      <Footer total={tasks.length} completed={completedCount} />
    </div>
  );
}