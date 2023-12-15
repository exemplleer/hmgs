import { Result } from 'antd';

const NotFound = () => {
  return (
    <Result
      status="404"
      title="Код ошибки: 404"
      subTitle="К сожалению, запрашиваемая Вами странице не найдена..."
    />
  );
};

export default NotFound;
