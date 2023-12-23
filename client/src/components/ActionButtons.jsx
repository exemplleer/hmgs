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
    <Link to={`${ROOMS_ROUTE}/${record.number}`}>
      <Tooltip placement="top" title="Больше информации">
        <InfoCircleTwoTone />
      </Tooltip>
    </Link>
    <Link to={`${ROOMS_ROUTE}/${record.number}/edit`}>
      <Tooltip placement="top" title="Редактирование информации">
        <EditTwoTone />
      </Tooltip>
    </Link>
    <Link></Link>
  </Flex>
);

export default ActionButtons;
