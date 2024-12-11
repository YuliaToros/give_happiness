import React, { useState } from 'react'; // useEffect
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { Card, Input, Button, Form, Space, message  } from 'antd';
import { updateUserProfile } from '@/entities/user/model/userThunk';

export const ProfileForm: React.FC = () => {
  const { user } = useAppSelector(state => state.user)
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch()
  
  type UserDataType = {
    name: string,
    email: string,
    phone: string,
    company_name: string,
    company_description: string, 
  }

  const [form] = Form.useForm();
  const [userData, setUserData] = useState<UserDataType>({
    name: user?.name || "",
    email: user?.email || "",
    phone: String(user?.phone),
    company_name: user?.company_name || "",
    company_description: user?.company_description || "",
  });
  
  const onFinish = (values: UserDataType) => {
    handleUpdate()
    setUserData({ ...userData, ...values });
    setIsEditing(false);
    form.setFieldsValue(values);
    message.success('Профиль обновлен!');
  };
  
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleUpdate = async () => {
    try {
      if (!userData.name || !userData.email || !userData.phone || !userData.company_name || !userData.company_description) {
        return message.warning('Пожалуйста, заполните все поля');
      }
      dispatch(updateUserProfile({...userData, phone: Number(userData.phone)}));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData((prev) => ({...prev, [event.target.name]: event.target.value}))
  }

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
          <Input name="name" onChange={handleChange} value={userData.name} disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input name="email" onChange={handleChange} value={userData.email} disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Телефон" name="phone">
          <Input name="phone" onChange={handleChange} value={userData.phone} disabled={!isEditing} />
        </Form.Item>
        {user?.role_id !== 3 && 
        <Form.Item label="Название компании" name="company_name">
          <Input name="company_name" onChange={handleChange} value={userData.company_name} disabled={!isEditing} />
        </Form.Item>
        }
        
        {user?.role_id !== 3 && 
        <Form.Item label="Описание компании" name="company_description">
          <Input.TextArea name="company_description" onChange={handleChange} value={userData.company_description} disabled={!isEditing} />
        </Form.Item>
        }

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