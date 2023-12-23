import { Form, InputNumber, Input, Space, Button } from 'antd';
import { errorMessage, successMessage } from '../utils/messages';
const { TextArea } = Input;

const RoomForm = ({
  form,
  isLoading,
  submitHandler,
  errorHandler,
  customButtons,
}) => {
  const requiredTextMessage = 'Это поле должно быть заполнено';

  const numberLengthLimitMessage = (from, to) =>
    `Число должно быть в пределах от ${from} до ${to}`;

  const stringLengthLimitMessage = (from, to) =>
    `Поле должно содержать от ${from} до ${to} символов`;

  return (
    <Form
      onFinish={submitHandler ?? (() => successMessage())}
      onFinishFailed={errorHandler ?? ((err) => errorMessage(err))}
      style={{
        maxWidth: 480,
      }}
      form={form}
      name="trigger"
      layout="horizontal"
      autoComplete="off"
      disabled={isLoading}
    >
      <Form.Item
        label="Номер"
        name="number"
        validateTrigger="onBlur"
        hasFeedback
        required
        rules={[
          {
            type: 'number',
            min: 0,
            max: 2147483647,
            message: numberLengthLimitMessage(0, 2147483647),
          },
          { required: true, message: requiredTextMessage },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          controls={false}
          placeholder="12"
        />
      </Form.Item>
      <Form.Item
        label="Название"
        name="title"
        validateTrigger="onBlur"
        hasFeedback
        required
        rules={[
          {
            min: 3,
            max: 255,
            message: stringLengthLimitMessage(3, 255),
          },
          { required: true, message: requiredTextMessage },
        ]}
      >
        <Input placeholder="Комфорт" />
      </Form.Item>
      <Form.Item
        label="Вместимость (без доп. мест)"
        name="capacity"
        validateTrigger="onBlur"
        hasFeedback
        required
        rules={[
          {
            type: 'number',
            min: 1,
            max: 100,
            message: numberLengthLimitMessage(1, 100),
          },
          { required: true, message: requiredTextMessage },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          controls={false}
          placeholder="4"
        />
      </Form.Item>
      <Form.Item
        label="Стоимость (в рублях, за сутки)"
        name="price"
        validateTrigger="onBlur"
        hasFeedback
        required
        rules={[
          {
            type: 'number',
            min: 0,
            max: 2147483647,
            message: numberLengthLimitMessage(0, 2147483647),
          },
          { required: true, message: requiredTextMessage },
        ]}
      >
        <InputNumber
          type="float"
          style={{ width: '100%' }}
          controls={false}
          placeholder="1000"
        />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        validateTrigger="onBlur"
        rules={[
          {
            max: 5000,
            message: 'Количество символов не должно быть больше 5000',
          },
        ]}
      >
        <TextArea
          showCount
          maxLength={5000}
          autoSize={{ maxRows: 5, minRows: 5 }}
          placeholder="Комфортабельный номер с видом на море..."
        />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
          {customButtons}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default RoomForm;
