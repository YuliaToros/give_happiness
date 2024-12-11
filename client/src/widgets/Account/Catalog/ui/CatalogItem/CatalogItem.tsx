import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select } from 'antd'; //  Image,
import { SertificateWithoutIdAndUserId } from '@/entities/sertificate/model';
import { useAppSelector } from '@/shared/hooks/rtkHooks';


interface CatalogItemProps {
  name: string;
  description: string;
  image: string;
  price: number;
  count: number;
  status: string;
  user_id : number | undefined;
  onEdit: (updatedSert: any, index: number) => void; // Updated prop type
  onDelete: () => void;
  index: number; // Added index for identification
}

export const CatalogItem: React.FC<CatalogItemProps> = ({ name, description, image, price, count, status, user_id, onEdit, onDelete, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { user } = useAppSelector((state) => state.user)
  

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({ name, description, image, price, count, status });
  };

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: SertificateWithoutIdAndUserId) => {
      onEdit(values, index);
      setIsModalOpen(false); // Close the modal after successful submission
  };

  return (
    <>
    {user?.id === user_id && (
      <>
      <Card style={{ marginBottom: 16 }}>
      <Card.Meta
        title={name}
        description={
          <div>
            <p>Описание: {description}</p>
            <p>Цена: {price}</p>
            <p>Количество: {count}</p>
            <p>Статус: {status}</p>
          </div>
        }
      />
      <div style={{ textAlign: 'right' }}>
        <Button type="primary" onClick={showModal}>Изменить</Button>
        <Button danger onClick={onDelete}>Удалить</Button>
      </div>
    </Card>
    <Modal title="Изменить сертификат" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} name="edit-certificate" onFinish={onFinish} layout="vertical">
        <Form.Item label="Название" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Описание" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Изображение" name="image">
          <Input /> {/*Simplified - replace with actual image upload if needed*/}
        </Form.Item>
        <Form.Item label="Цена" name="price">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Количество" name="count">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Статус" name="status">
          <Select>
            <Select.Option value="Активен">Активен</Select.Option>
            <Select.Option value="Не активен">Не активен</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
    </>
    )}
      
    </>
  );
};