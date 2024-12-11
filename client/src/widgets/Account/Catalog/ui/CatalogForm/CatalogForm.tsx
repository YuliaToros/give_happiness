import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Input,  Select, Modal, message } from 'antd'; // Upload,
//import { UploadOutlined } from '@ant-design/icons';
import { CatalogItem } from '../CatalogItem/CatalogItem';
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { createSertificate } from '@/entities/sertificate/model/sertificatesThunk';
import { SertificateWithoutIdAndUserId } from '@/entities/sertificate/model';

// interface CatalogFormProps {
//   userId: number; // Add userId prop to identify user's certificates
// }

export const CatalogForm: React.FC = () => {

  const { sertificates } = useAppSelector(state => state.sertificates)
  const dispatch = useAppDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false);
  
   const initialValues = {
    name: "",
    description: "",
    image: "",
    price: 0,
    count: 0,
    status: '',
  }
  const [form] = Form.useForm();
  const onFinish = (values: SertificateWithoutIdAndUserId ) => {
    const { name, description, image, price, count, status } = values
    if (!name || !description || !image || !price || !count || !status) {
      return message.warning('Пожалуйста, заполните все поля');
    }
    console.log(name, description, image, price, count, status);

    dispatch(createSertificate({ name, description, image, price, count, status}))
    
    setIsModalVisible(false);
    form.resetFields();
    message.success('Сертификат добавлен!');
  };

  useEffect(() => {
    
  },[ ])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  

  //  handleEditCertificate remains unchanged

  // <Upload>
  //    {<Button icon={<UploadOutlined />}>Загрузить</Button>}
  // </Upload>

  return (
    <Card>
      <Button type="primary" onClick={showModal}>Добавить сертификат</Button>
      <Modal
        title="Добавить сертификат"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Remove default footer
      >
        <Form
          form={form}
          name="basic"
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ marginTop: 16 }}
        >
          {/* Form items remain the same */}
          <Form.Item label="Название" name="name">
            <Input name="name" />
          </Form.Item>
          <Form.Item label="Описание" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Изображение" name="image">
            <Input />
          </Form.Item>
          <Form.Item label="Цена" name="price">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Количество" name="count">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Статус" name="status">
            <Select>
              <Select.Option value="inmoder">Активен</Select.Option>
              <Select.Option value="unmoder">Не активен</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
            <Button onClick={handleCancel}>Отмена</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Card title="Текущие сертификаты" style={{ marginTop: 16 }}>
        {sertificates.map((sert, index) => (
          <CatalogItem
            key={index}
            {...sert} index={index}
            //onDelete={() => handleDeleteCertificate(index)}
            onDelete={() => console.log("on delete")
            }
            onEdit={() => console.log("on edit")}
          />
        ))}
      </Card>
    </Card>
  );
};

// Placeholder for CatalogItem component.  Replace with your actual component
// const CatalogItem: React.FC<{
//   name: string;
//   description: string;
//   image: string;
//   price: number;
//   count: number;
//   status: string;
//   onDelete: () => void;
//   onEdit?: () => void;
// }> = ({ name, description, image, price, count, status, onDelete, onEdit }) => (
//   <div>
//     <h3>{name}</h3>
//     <p>{description}</p>
//     <img src={image} alt={title} style={{ maxWidth: '100px' }} />
//     <p>Цена: {price}</p>
//     <p>Количество: {count}</p>
//     <p>Статус: {status}</p>
//     <Button type="danger" onClick={onDelete}>Удалить</Button>
//     {onEdit && <Button type="primary" onClick={onEdit}>Редактировать</Button>}
//   </div>
// );