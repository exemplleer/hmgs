import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Space, Table, Card } from 'antd';
import RoomService from '../../api/RoomService';
import BackButton from '../../components/BackButton';
import { errorMessage } from '../../utils/messages';

const RoomInfo = () => {
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { num } = useParams();

  const fetchRoom = async (num) => {
    try {
      const response = await RoomService.getOneRoom(num);
      const room = response.result;
      const statuses = room.statuses.map((status, index) => ({
        ...status,
        key: index,
      }));
      room.statuses = statuses;
      setRoom(room);
    } catch (error) {
      errorMessage(error, 'Ошибка при получении данных');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom(num);
  }, [num]);

  return (
    <Space direction="vertical" size="large">
      <BackButton />
      <Row gutter={[25, 25]}>
        <Col>
          <Card
            title={`Подробная информация`}
            style={{ width: 300 }}
            loading={isLoading}
          >
            <p>
              <strong>Номер: </strong> <span>{room.num}</span>
            </p>
            <p>
              <strong>Название: </strong> <span>{room.title}</span>
            </p>
            <p>
              <strong>Цена: </strong> <span>{room.price} руб.</span>
            </p>
            <p>
              <strong>Вместимость: </strong> <span>{room.capacity} чел.</span>
            </p>
            <div>
              <p style={{ whiteSpace: 'pre-line' }}>
                <strong>Описание: </strong>
                {room.description}
              </p>
            </div>
          </Card>
        </Col>
        <Col>
          <Table
            size="small"
            bordered
            loading={isLoading}
            columns={[
              {
                title: 'Статус',
                dataIndex: 'is_available',
                key: 'is_available',
                fixed: 'left',
                render: (_, record) =>
                  record.is_available ? 'Доступен' : 'Не доступен',
              },
              {
                title: 'Начало',
                dataIndex: 'begin_date',
                key: 'begin_date',
              },
              {
                title: 'Конец',
                dataIndex: 'end_date',
                key: 'end_date',
              },
            ]}
            dataSource={room.statuses}
            pagination={false}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default RoomInfo;
