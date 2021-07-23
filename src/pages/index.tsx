import React from 'react';
import { Layout, Drawer, Menu } from 'antd';
import { BuildOutlined, CodeOutlined, DatabaseOutlined } from '@ant-design/icons'
import { CodeEditor } from '@/components';
import { render } from 'react-dom';
import MainPage from './mainPage'
import './style.less';
const { Sider, Content } = Layout;

const Page = () => {
  const [key,setKey] = React.useState('2')
  const [functionVisible, setFunctionVisible] = React.useState(false)
  const handleClick = async (e) => {
    switch (e.key) {
      case '1':
        setKey('1')
        break;
      case '2':
        setKey('2')
        break;
      case '3':
        // setKey('3')
        await setFunctionVisible(true)
        await render(
          <CodeEditor />,
          document.getElementsByClassName('ant-drawer-body')[0]
        );
        break;
    
      default:
        break;
    }
    
  }
  return <Layout>
    <Sider width={50} className="site-layout-background">
      <Menu
        onClick={handleClick}
        // selectable={false}
        selectedKeys={[key]}
        // defaultSelectedKeys={['2']}
        theme={'dark'}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key='1'><BuildOutlined /></Menu.Item>
        <Menu.Item key='2'><DatabaseOutlined /></Menu.Item>
        <Menu.Item key='3' ><CodeOutlined /></Menu.Item>
      </Menu>

    </Sider>
    <Drawer
      width='100%'
      title="Functions"
      className="function-drawer"
      placement="left"
      closable={true}
      onClose={() => setFunctionVisible(false)}
      visible={functionVisible}
      destroyOnClose={false}
      getContainer={'.site-layout-background'}
    >
    </Drawer>
    <Layout style={{ padding: '0 24px 24px' }}>

      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <MainPage selectedKey={key}></MainPage>
      </Content>
    </Layout>
  </Layout>
}

export default Page;