import React, { useState } from 'react';
import { Card, Button, Avatar, Image, Modal, Form, Input, Select } from 'antd';

interface CatalogItemProps {
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  status: string;
  onEdit: (updatedCert: any, index: number) => void; // Updated prop type
  onDelete: () => void;
  index: number; // Added index for identification
}

export const CatalogItem: React.FC<CatalogItemProps> = ({ title, description, image, price, quantity, status, onEdit, onDelete, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({ title, description, image, price, quantity, status });
  };

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
      onEdit(values, index);
      setIsModalOpen(false); // Close the modal after successful submission
  };

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <Card.Meta
          avatar={<Avatar src={image || 'https://joeschmoe.io/api/v1/random'} />}
          title={title}
          description={
            <div>
              <p>Описание: {description}</p>
              <p>Цена: {price}</p>
              <p>Количество: {quantity}</p>
              <p>Статус: {status}</p>
            </div>
          }
        />
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={showModal}>Изменить</Button>
          <Button type="danger" onClick={onDelete}>Удалить</Button>
        </div>
      </Card>
      <Modal title="Изменить сертификат" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} name="edit-certificate" onFinish={onFinish} layout="vertical">
          <Form.Item label="Название" name="title">
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
          <Form.Item label="Количество" name="quantity">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Статус" name="status">
            <Select>
              <Option value="Активен">Активен</Option>
              <Option value="Не активен">Не активен</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};