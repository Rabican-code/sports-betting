export default function Field({ label, error, id, className = '', ...props }) {
    const inputId = id || props.name;

    return (
        <div className={className}>
            <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
                {label}
            </label>
            <input
                id={inputId}
                {...props}
                className={`block w-full rounded-lg border-0 px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${error ? 'ring-red-400' : 'ring-slate-300'
                    }`}
            />
            {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        </div>
    );
}
