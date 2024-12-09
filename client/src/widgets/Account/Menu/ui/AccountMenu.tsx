import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  HistoryOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { CatalogForm } from '../../Catalog/index';
import { ProfileForm } from '../../Profile';
import { useAppSelector } from '@/shared/hooks/rtkHooks';

const { Header, Sider, Content } = Layout;

export const AccountMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1'); // Добавлено состояние для выбранного пункта меню
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user } = useAppSelector(state => state.user)

  return (
    <>
    {user && (
      <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedMenuItem]} // Установка выбранного ключа
          onClick={(item) => setSelectedMenuItem(item.key)} // Обработчик клика для обновления состояния
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Профиль',
            },
            {
              key: '2',
              icon: <UnorderedListOutlined />,
              label: 'Каталог',
            },
            {
              key: '3',
              icon: <HistoryOutlined />,
              label: 'История покупок',
            },
            {
              key: '4',
              icon: <HistoryOutlined />,
              label: 'История продаж',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Условная отрисовка контента */}
          {selectedMenuItem === '1' && <ProfileForm />}
          {selectedMenuItem === '2' && <CatalogForm userId={user.id}/>}
          {/* Добавьте другие компоненты для других пунктов меню (Catalog, PurchaseHistory, SalesHistory) */}
        </Content>
      </Layout>
    </Layout>
    )}
    </>
  );
};