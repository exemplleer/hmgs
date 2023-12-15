import { Table } from 'antd';
import ActionButtons from './ActionButtons';

const columns = [
  {
    title: 'Номер',
    dataIndex: 'number',
    key: 'number',
    width: '15%',
  },
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
    width: '50%',
  },
  {
    title: 'Цена (в сутки)',
    dataIndex: 'price',
    key: 'price',
    render: (text) => `${text} руб.`,
    width: '15%',
  },
  {
    title: 'Вместимость',
    dataIndex: 'capacity',
    key: 'capacity',
    render: (text) => `${text} чел.`,
    width: '15%',
  },
  {
    title: 'Действия',
    key: 'actions',
    render: (_, record) => <ActionButtons record={record}></ActionButtons>,
    width: '5%',
    fixed: 'right',
  },
];

const RoomsTable = ({ data, isLoading }) => {
  return (
    <Table
      bordered={true}
      columns={columns}
      loading={isLoading}
      dataSource={data}
      scroll={{ x: true }}
      size="small"
      pagination={false}
    />
  );
};

export default RoomsTable;
