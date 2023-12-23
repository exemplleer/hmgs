import { notification } from 'antd';

export const successMessage = (message, description) => {
  notification.success({
    message: message || 'Операция выполнена успешно',
    description: description || '',
    duration: 2.5,
  });
};

export const errorMessage = (error, message, description) => {
  notification.error({
    message: message || 'Ошибка',
    description: description || error.message || '',
    duration: 2.5,
  });
};
