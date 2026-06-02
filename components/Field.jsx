export default function Field({ label, valueLabel, type = "number", value, onChange, children, ...props }) {
  const labelText = valueLabel ? (
    <>
      {label} <span>{valueLabel}</span>
    </>
  ) : (
    label
  );

  return (
    <div className="field">
      <label>{labelText}</label>
      {children ? (
        <select value={value} onChange={(event) => onChange(event.target.value)} {...props}>
          {children}
        </select>
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} {...props} />
      )}
    </div>
  );
}
