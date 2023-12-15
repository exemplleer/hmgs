import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Space, Table, Card } from 'antd';
import RoomService from '../../api/RoomService';
import BackButton from '../../components/BackButton';

const RoomInfo = () => {
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { number } = useParams();

  const fetchRoom = async (number) => {
    try {
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
  }, [number]);

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
              <strong>Номер: </strong> <span>{room.number}</span>
            </p>
            <p>
              <strong>Название: </strong> <span>{room.title}</span>
            </p>
            <p>
              <strong>Цена: </strong> <span>{room.price} руб.</span>
            </p>
            <p>
              <strong>Вместимость: </strong> <span>{room.price} чел.</span>
            </p>
            <p>
              <strong>Описание: </strong> <span>{room.description}</span>
            </p>
          </Card>
        </Col>
        <Col>
          <Table
            size="small"
            bordered
            columns={[
              {
                title: 'Статус',
                dataIndex: 'is_avalible',
                key: 'is_avalible',
                fixed: 'left',
                render: (_, record) =>
                  record.is_availible ? 'Доступен' : 'Не доступен',
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
