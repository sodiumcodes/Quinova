import { useUiStore } from '../../store/ui.store';
import { XCircle, CheckCircle, Info } from 'lucide-react';

const Toast = () => {
  const toast = useUiStore((state) => state.toast);
  const hideToast = useUiStore((state) => state.hideToast);

  if (!toast) return null;

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  const Icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const Icon = Icons[toast.type] || Icons.info;

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 text-white shadow-lg transition-all \${bgColors[toast.type] || bgColors.info}`}>
      <Icon className="h-5 w-5" />
      <span className="font-medium">{toast.message}</span>
      <button onClick={hideToast} className="ml-4 hover:opacity-80">
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
