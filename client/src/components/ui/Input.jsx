import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`rounded-lg border bg-quinova-main px-3 py-2 text-white placeholder-gray-400 outline-none transition-all focus:ring-2 \${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-quinova-secondary focus:border-quinova-tertiary focus:ring-quinova-tertiary/20'
        } \${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
