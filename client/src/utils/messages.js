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
    message: message || 'Произошла ошибка',
    description:
      description ||
      error?.response?.data?.errors[0].msg ||
      error?.message ||
      '',
    duration: 2.5,
  });
};
