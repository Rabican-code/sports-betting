export default function Logo({ size = 'md' }) {
    const box = size === 'sm' ? 'h-9 w-9' : 'h-12 w-12';

    return (
        <div className={`flex ${box} items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" className="h-1/2 w-1/2">
                <circle cx="12" cy="12" r="9" />
                <path d="M3.5 9h17M3.5 15h17M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
            </svg>
        </div>
    );
}
