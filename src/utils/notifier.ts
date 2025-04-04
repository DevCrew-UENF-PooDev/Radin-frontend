import { Notify } from 'quasar';

export const showNotify = (
  message: string,
  type: 'positive' | 'negative' | 'warning' | 'info' = 'positive',
) => {
  Notify.create({
    progress: true,
    position: 'bottom-right',
    message,
    type,
    actions: [
      {
        icon: 'close',
        color: 'white',
        round: true,
      },
    ],
  });
};
