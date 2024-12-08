import React, { useState } from 'react';
import { Button, Form, Input, Select, Upload, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CatalogItem } from '../CatalogItem/CatalogItem';

const { Option } = Select;

interface CatalogFormProps {
  userId: string; // Add userId prop to identify user's certificates
}

export const CatalogForm: React.FC<CatalogFormProps> = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [certificates, setCertificates] = useState([
    // Example data - replace with actual data fetching logic
    {
      title: 'Сертификат 1',
      description: 'Описание сертификата 1',
      image: 'https://via.placeholder.com/150',
      price: 100,
      quantity: 5,
      status: 'Активен',
    },
  ]);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setCertificates([...certificates, { ...values }]);  //userId 
    setIsAdding(false);
    form.resetFields();
    message.success('Сертификат добавлен!');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleAddCertificate = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    form.resetFields();
  };

  const handleDeleteCertificate = (index:number) => {
    const updatedCertificates = certificates.filter((_, i) => i !== index);
    setCertificates(updatedCertificates);
  };

  const handleEditCertificate = (values: any, index: number) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index] = { ...updatedCertificates[index], ...values };
    setCertificates(updatedCertificates);
  };


  return (
    <Card>
      <Button type="primary" onClick={handleAddCertificate}>Добавить сертификат</Button>
      {isAdding && (
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ marginTop: 16 }}
        >
          <Form.Item label="Название" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Описание" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Изображение" name="image">
            <Upload>
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
            <Button onClick={handleCancelAdd}>Отмена</Button>
          </Form.Item>
        </Form>
      )}
      <Card title="Текущие сертификаты" style={{marginTop: 16}}>
          {certificates.map((cert, index) => (
            <CatalogItem
              key={index}
              {...cert}
              onEdit={() => handleEditCertificate(values, index)}
              onDelete={() => handleDeleteCertificate(index)}
            />
          ))}
      </Card>
    </Card>
  );
};