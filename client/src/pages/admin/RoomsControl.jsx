import { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROOMS_ROUTE } from '../../utils/consts';
import RoomService from '../../api/RoomService';
import RoomsTable from '../../components/RoomsTable';

const RoomsControl = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const response = await RoomService.getAllRooms();
      setRooms(response.result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchRooms();
  };

  const handleAddRoom = () => {
    navigate(`${ROOMS_ROUTE}/create`);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <Space size="middle" direction="vertical" style={{ width: '100%' }}>
      <h2 style={{ margin: 0 }}>Список всех гостиничных номеров </h2>
      <Space size="small" wrap>
        <Button onClick={handleRefresh}>Обновить</Button>
        <Button type="primary" onClick={handleAddRoom}>
          Добавить новый номер
        </Button>
      </Space>
      <RoomsTable data={rooms} isLoading={isLoading}></RoomsTable>
    </Space>
  );
};

export default RoomsControl;
