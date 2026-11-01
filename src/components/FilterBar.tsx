import type { Filter } from '../types';

type Props = {
  filter: Filter;
  onChange: (filter: Filter) => void;
};

const options: { value: Filter; label: string; icon: string }[] = [
  { value: 'all', label: 'Все', icon: '☰' },
  { value: 'active', label: 'Активные', icon: '◷' },
  { value: 'completed', label: 'Выполненные', icon: '✓' },
];

export default function FilterBar({ filter, onChange }: Props) {
  return (
    <div className="filter-bar">
      {options.map((o) => (
        <button
          key={o.value}
          className={`filter-btn ${o.value} ${filter === o.value ? 'selected' : ''}`}
          onClick={() => onChange(o.value)}
        >
          <span>{o.icon}</span> {o.label}
        </button>
      ))}
    </div>
  );
}