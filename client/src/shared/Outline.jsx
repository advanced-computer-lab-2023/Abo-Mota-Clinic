import { useState, createElement, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const Outline = ({ items }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  // Function to handle menu item click
  const onMenuClick = (e) => {
    const selectedItem = items.find(item => item.key === e.key);
    if (selectedItem && selectedItem.to) {
      navigate(`/doctor${selectedItem.to}`);
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={items.map(item => ({...item, icon: createElement(item.icon.type)}))}
          onClick={onMenuClick} // Add onClick handler
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? '80px' : '200px',
          transition: 'margin-left 0.2s',
        }}
      >
        <Header style={{ padding: 0, position: 'sticky',background: colorBgContainer, top: 0, zIndex: 1000 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: '64px', height: '64px', border: 'none' }}
          />
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Outline;
