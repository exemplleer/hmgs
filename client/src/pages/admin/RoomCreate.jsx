import { Button, Form, Space } from 'antd';
import BackButton from '../../components/BackButton';
import RoomForm from '../../components/RoomForm';
import { ROOMS_ROUTE } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import RoomService from '../../api/RoomService';
import { successMessage } from '../../utils/messages';

const RoomCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinishCreate = async (data) => {
    await RoomService.createRoom(data);
    navigate(ROOMS_ROUTE);
    successMessage('Номер создан успешно');
  };

  return (
    <Space size="middle" direction="vertical" style={{ width: '100%' }}>
      <BackButton />
      <h2>Создание новой комнаты</h2>
      <RoomForm
        form={form}
        submitHandler={onFinishCreate}
        customButtons={<Button htmlType="reset">Сбросить</Button>}
      />
    </Space>
  );
};

export default RoomCreate;
