type Props = {
  total: number;
  completed: number;
};

export default function Footer({ total, completed }: Props) {
  return (
    <p className="footer">
      {total} {total === 1 ? 'задача' : 'задач'} <span>•</span>
      <b className="green">{completed} выполненные</b> <span>•</span>
      <b className="orange">{total - completed} незакрытые</b>
    </p>
  );
}