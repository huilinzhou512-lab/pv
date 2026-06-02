export default function ResultPanel({ title, bigValue, bigLabel, rows, note }) {
  return (
    <aside className="result">
      <h3>{title}</h3>
      <div className="big">
        <b>{bigValue}</b>
        <span>{bigLabel}</span>
      </div>
      <div className="result-list">
        {rows.map((row) => (
          <div key={row.label}>
            <span>{row.label}</span>
            <b>{row.value}</b>
          </div>
        ))}
      </div>
      {note ? <div className="note">{note}</div> : null}
    </aside>
  );
}
