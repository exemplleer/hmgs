import { Link } from 'react-router-dom';
import { Flex, Tooltip } from 'antd';
import { EditTwoTone, InfoCircleTwoTone } from '@ant-design/icons';
import { ROOMS_ROUTE } from '../utils/consts';

const ActionButtons = ({ record }) => (
  <Flex
    size="middle"
    justify="center"
    gap="0.6rem"
    style={{ fontSize: '1rem' }}
  >
    <Link to={`${ROOMS_ROUTE}/${record.num}`}>
      <Tooltip placement="top" title="Подробнее">
        <InfoCircleTwoTone />
      </Tooltip>
    </Link>
    <Link to={`${ROOMS_ROUTE}/${record.num}/edit`}>
      <Tooltip placement="top" title="Редактирование">
        <EditTwoTone />
      </Tooltip>
    </Link>
    <Link></Link>
  </Flex>
);

export default ActionButtons;
