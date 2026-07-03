import { toast } from 'react-toastify';

export function triggerToast(msg, bgColor) {
  toast.info(msg, {
    autoClose: 3000,
    style: {
      backgroundColor: bgColor,
      color: 'white',
      fontWeight: 'medium',
    },
    progressClassName: 'progress-style',
  });
}
