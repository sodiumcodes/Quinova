const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-quinova-bg disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-quinova-tertiary text-quinova-bg hover:bg-[#a5ccb1] focus:ring-quinova-tertiary shadow-[0_0_15px_rgba(142,182,155,0.3)] hover:shadow-[0_0_25px_rgba(142,182,155,0.5)]',
    secondary: 'bg-quinova-secondary text-gray-100 hover:bg-quinova-main focus:ring-quinova-secondary',
    outline: 'border-2 border-quinova-tertiary bg-transparent text-quinova-tertiary hover:bg-quinova-tertiary/10 focus:ring-quinova-tertiary',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 focus:ring-red-500 border border-red-500/50',
    ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-quinova-secondary/50',
  };

  return (
    <button
      className={`\${baseStyles} \${variants[variant]} \${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
