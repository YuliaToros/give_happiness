import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { Card, Input, Button, Form, Space, Select } from 'antd';
const { Option } = Select;

export const ProfileForm: React.FC = () => {
  const { user } = useAppSelector(state => state.user)
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [phone, setPhone] = useState(String(user?.phone))
  const [verifyStatus, setVerifyStatus] = useState(String(user?.verify_status))
  const [companyName, setCompanyName] = useState(user?.company_name)
  const [companyDescription, setCompanyDescription] = useState(user?.company_description)

  const dispatch = useAppDispatch()

  // дописать
  //dispatch(updateProfile({ name, email, phone: Number(phone), verifyStatus: Number(verifyStatus), companyName, companyDescription }))
  
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
          <Input onChange={({ target }) => setName(target.value)} defaultValue={name} disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input onChange={({ target }) => setEmail(target.value)} defaultValue={email} disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Телефон" name="phone">
          <Input onChange={({ target }) => setPhone(target.value)} defaultValue={phone} disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Статус верификации" name="verify_status">
          <Select onChange={({ target }) => setVerifyStatus(target.value)} defaultValue={verifyStatus} disabled={!isEditing}>
            <Option value="Верифицирован">Верифицирован</Option>
            <Option value="В процессе верификации">В процессе верификации</Option>
            <Option value="Не верифицирован">Не верифицирован</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Название компании" name="company_name">
          <Input onChange={({ target }) => setCompanyName(target.value)} defaultValue={companyName} disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Описание компании" name="company_description">
          <Input.TextArea onChange={({ target }) => setCompanyDescription(target.value)} defaultValue={companyDescription} disabled={!isEditing} />
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