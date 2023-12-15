import { Form, Space } from 'antd';
import BackButton from '../../components/BackButton';
import RoomForm from '../../components/RoomForm';
import { ROOMS_ROUTE } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import RoomService from '../../api/RoomService';

const RoomCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinishCreate = (data) => {
    RoomService.createRoom(data).then(() => navigate(ROOMS_ROUTE));
  };

  return (
    <Space size="middle" direction="vertical" style={{ width: '100%' }}>
      <BackButton />
      <h2>Создание новой комнаты</h2>
      <RoomForm form={form} submitHandler={onFinishCreate} />
    </Space>
  );
};

export default RoomCreate;