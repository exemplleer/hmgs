import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Popconfirm, Space } from 'antd';
import BackButton from '../../components/BackButton';
import RoomForm from '../../components/RoomForm';
import RoomService from '../../api/RoomService';
import { ROOMS_ROUTE } from '../../utils/consts';

const RoomEdit = () => {
  const [form] = Form.useForm();
  const [room, setRoom] = useState({});
  const { number } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinishUpdate = (number, data) => {
    console.log(data);
    RoomService.updateRoom(number, data).then(() => navigate(ROOMS_ROUTE));
  };

  const removeHandler = (number) => {
    RoomService.removeRoom(number).then(() => navigate(ROOMS_ROUTE));
  };

  const fetchRoom = async (number) => {
    try {
      setIsLoading(true);
      const response = await RoomService.getOneRoom(number);
      setRoom(response.result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom(number);
  }, [form, number]);

  form.setFieldsValue({
    title: room.title,
    number: Number(room.number),
    price: Number(room.price),
    capacity: room.capacity,
    description: room.description,
  });

  return (
    <Space size="middle" direction="vertical" style={{ width: '100%' }}>
      <BackButton />
      <h2>Редактирование гостиничного номера</h2>
      <RoomForm
        form={form}
        isLoading={isLoading}
        submitHandler={() => onFinishUpdate(number, form.getFieldsValue())}
        failHandler={(error) => console.error(error)}
        customButtons={
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
        }
      />
    </Space>
  );
};

export default RoomEdit;
