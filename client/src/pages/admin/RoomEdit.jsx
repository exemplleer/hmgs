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
  const { num } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const submitHandler = async (num, data) => {
    try {
      await RoomService.updateRoom(num, data);
      navigate(ROOMS_ROUTE);
      successMessage('Номер успешно обновлен');
    } catch (error) {
      errorMessage(error, 'Ошибка при обновлении номера');
    }
  };

  const removeHandler = async (num) => {
    try {
      await RoomService.removeRoom(num).then(() => navigate(ROOMS_ROUTE));
      successMessage('Номер был успешно удален');
    } catch (error) {
      errorMessage(error, 'Ошибка при удалении номера');
    }
  };

  const fillForm = async (form, num) => {
    try {
      const response = await RoomService.getOneRoom(num);
      const room = response.result;

      form.setFieldsValue({
        title: room.title,
        num: room.num,
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
    fillForm(form, num);
  }, [num]);

  return (
    <Space size="middle" direction="vertical" style={{ width: '100%' }}>
      <BackButton />
      <h2>Редактирование гостиничного номера</h2>
      <RoomForm
        form={form}
        isLoading={isLoading}
        submitHandler={() => submitHandler(num, form.getFieldsValue())}
        customButtons={
          <>
            <Button
              onClick={() => {
                fillForm(form, num);
                setIsLoading(true);
              }}
            >
              Сбросить
            </Button>
            <Popconfirm
              title="Удалить этот номер?"
              description="Это действие необратимо! Вы уверены, что хотите удалить этот номер?"
              onConfirm={() => removeHandler(num)}
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
