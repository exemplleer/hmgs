import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Popconfirm, Space } from 'antd';
import BackButton from '../../components/BackButton';
import RoomForm from '../../components/RoomForm';
import RoomService from '../../api/RoomService';
import { ROOMS_ROUTE } from '../../utils/consts';
import { errorMessage, successMessage } from '../../utils/messages';

const RoomEdit = () => {
  const [form] = Form.useForm();
  const { number } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const submitHandler = async (number, data) => {
    try {
      await RoomService.updateRoom(number, data);
      navigate(ROOMS_ROUTE);
      successMessage('Номер успешно обновлен');
    } catch (error) {
      errorMessage(
        error,
        'Ошибка при обновлении номера',
        error.response.data.errors[0].msg,
      );
    }
  };

  const removeHandler = async (number) => {
    try {
      await RoomService.removeRoom(number).then(() => navigate(ROOMS_ROUTE));
      successMessage('Номер был успешно удален');
    } catch (error) {
      errorMessage(error, 'Ошибка при удалении номера');
    }
  };

  const fillForm = async (form, number) => {
    try {
      const response = await RoomService.getOneRoom(number);
      const room = response.result;

      form.setFieldsValue({
        title: room.title,
        number: room.number,
        price: Number(room.price),
        capacity: Number(room.capacity),
        description: room.description,
      });
    } catch (error) {
      errorMessage(error, 'Ошибка при получении данных');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fillForm(form, number);
  }, [number]);

  return (
    <Space size="middle" direction="vertical" style={{ width: '100%' }}>
      <BackButton />
      <h2>Редактирование гостиничного номера</h2>
      <RoomForm
        form={form}
        isLoading={isLoading}
        submitHandler={() => submitHandler(number, form.getFieldsValue())}
        customButtons={
          <>
            <Button
              onClick={() => {
                fillForm(form, number);
                setIsLoading(true);
              }}
            >
              Сбросить
            </Button>
            <Popconfirm
              title="Удалить этот номер?"
              description="Это действие необратимо! Вы уверены, что хотите удалить этот номер?"
              onConfirm={() => removeHandler(number)}
              okText="Да"
              cancelText="Нет"
            >
              <Button type="primary" danger>
                Удалить
              </Button>
            </Popconfirm>
          </>
        }
      />
    </Space>
  );
};

export default RoomEdit;
