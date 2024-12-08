import React, { useState } from 'react';
import { Card, Input, Button, Form, Space, Select } from 'antd';
const { Option } = Select;

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({
    name: 'Иван Иванов',
    phone: '+79991234567',
    verify_status: 'Верифицирован',
    company_name: 'ООО "Пример"',
    company_description: 'Описание компании',
    email: 'ivan.ivanov@example.com',
  });

  const onFinish = (values: any) => {
    setUserData({ ...userData, ...values });
    setIsEditing(false);
    form.setFieldsValue(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    form.setFieldsValue(userData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue(userData);
  };

  return (
    <Card>
      <Form
        form={form}
        name="basic"
        initialValues={userData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item label="Имя" name="name">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Телефон" name="phone">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Статус верификации" name="verify_status">
          <Select disabled={!isEditing}>
            <Option value="Верифицирован">Верифицирован</Option>
            <Option value="В процессе верификации">В процессе верификации</Option>
            <Option value="Не верифицирован">Не верифицирован</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Название компании" name="company_name">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Описание компании" name="company_description">
          <Input.TextArea disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input disabled={!isEditing} />
        </Form.Item>

        {isEditing && (
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
              <Button onClick={handleCancel}>Отменить</Button>
            </Space>
          </Form.Item>
        )}
        {!isEditing && (
          <Form.Item>
            <Button type="primary" onClick={handleEditClick}>Изменить данные</Button>
          </Form.Item>
        )}
      </Form>
    </Card>
  );
};