import React from 'react';
import { Input, List } from 'antd';
import './style.less';

const {Search} = Input

export const DataSourcePanel:React.FC = (props)=>{
  const onSearch = (v)=>{
    console.log(v)
  }
  const dataSource = [
    { key: 'hello' },
    { key: 'world' },
    { key: 'test' },
  ]
  const [data, setData] = React.useState(dataSource)

  return <div className='data-source-panel'>
    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>]}
        >
          <List.Item.Meta
            title={<div>{item.key}</div>}
            // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  </div>
}