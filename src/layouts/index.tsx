import React from 'react';
import { Layout, Menu, Drawer } from 'antd';
import { CodeEditor } from '@/components';
import './style.less';
const { SubMenu } = Menu;
const { Header } = Layout;

const Layouts: React.FC = (props: any) => {
  return (
    <Layout className="global_layout" style={{ height: '100%' }}>
      <Header className="header">
        {/* <div className="logo" /> */}
        <div className="logo">CodeZera</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}></Menu>
      </Header>
      {props.children}
    </Layout>
  );
};

export default Layouts;
