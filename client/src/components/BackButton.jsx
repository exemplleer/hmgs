import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <Button
      style={{ padding: 0 }}
      type="link"
      size="middle"
      onClick={() => navigate(-1)}
      {...props}
    >
      <LeftOutlined /> Вернуться назад
    </Button>
  );
};

export default BackButton;
