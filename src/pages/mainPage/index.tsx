import React, { useEffect, useState } from 'react';
import { Input, Form } from 'antd';
import { observer, inject } from 'mobx-react';
import { ComponentWrapper, CanvasWrapper } from '@/components';
import './index.less';
import { getElementLeft, getElementTop, uuid } from '../utils';
import { ComponentItem } from '../../types';
import _ from 'lodash';
import { injectComponents, injectComponentJson } from './injectComponents';
import { DataSourcePanel } from './components/DataSourcePanel';
/**
 * TODO:
 * 1.代码编辑器
 * 2.数据源编辑器 axios 注册功能
 * 3.生成器
 * 4.对齐线
 */

// interface LoginPageProps {
//   stores: stores;
// }

const FormItem = Form.Item;

const Canvas = () => {
  return {};
};

const MainPage: React.FC<any> = props => {
  // 强制刷新
  const [fresh, setFresh] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const useForceUpdate = () => {
    setFresh((num: number): number => num + 1);
  };

  useEffect(() => {
    props?.canvasStore.setComponentsData(injectComponentJson);
    useForceUpdate();
  }, []);

  // canvas

  //
  const onDragEnter = e => {
    console.log(e.dataTransfer.getData('index'), 'onDragEnter');
  };

  const onDragLeave = e => {
    // selectedComponent(e);
  };

  const onDragOver = e => {
    console.log('onDragOver');
    e.preventDefault();
  };

  const onDrop = e => {
    const canvas = document.querySelector('.canvas');
    const canvasPosition = {
      left: getElementLeft(canvas),
      top: getElementTop(canvas),
    };

    let isCreate = e.dataTransfer.getData('isCreate');
    let pointerOffset = JSON.parse(e.dataTransfer.getData('pointerOffset'));
    let pageX = e.pageX - pointerOffset.left;
    let pageY = e.pageY - pointerOffset.top;
    const isInCanvas =
      pageX >= canvasPosition.left &&
      pageX <= canvasPosition.left + canvas?.clientWidth &&
      pageY >= canvasPosition.top &&
      pageY <= canvasPosition.top + canvas?.clientHeight;

    if (!isInCanvas) return;
    // 判断坐标是新创建还是拖动画布内元素
    if (isCreate) {
      const componentId = e.dataTransfer.getData('componentId');
      let componentForCreate = _.cloneDeep(
        props.canvasStore.componentsData.find(
          i => i.componentId == componentId,
        ),
      );
      componentForCreate.style = {
        ...componentForCreate.style,
        top: pageY - canvasPosition.top,
        left: pageX - canvasPosition.left,
      };
      componentForCreate.uuid = uuid();
      props.canvasStore.addCanvasData(componentForCreate);
    } else {
      let uuid = e.dataTransfer.getData('uuid');
      let componentForDrag = props.canvasStore.canvasData.find(
        i => i.uuid == uuid,
      );
      componentForDrag.style = {
        ...componentForDrag.style,
        top: pageY - canvasPosition.top,
        left: pageX - canvasPosition.left,
      };
      props.canvasStore.editCanvasData(uuid, componentForDrag);
    }

    useForceUpdate();
  };

  const history = () => {};

  const onMouseDown = e => {
    setSelectedComponent(e);
  };

  const { selectedKey } = props;
  return (
    <div className="page">
      {/* <div className="tools">tools</div> */}
      <div className="content">
        <div className="sider">
          {/* 渲染组件 */}
          {selectedKey == 1 && (
            <div>
              <div className="sider-panel-title">组件</div>
              <div className="sider-panel-content">
                {props?.canvasStore?.componentsData.map((i: ComponentItem) => {
                  const {
                    data: { type, props, children },
                    componentId,
                    desc,
                  } = i;
                  return (
                    <ComponentWrapper desc={desc} componentId={componentId}>
                      {React.createElement(
                        injectComponents[type],
                        props,
                        children,
                      )}
                    </ComponentWrapper>
                  );
                })}
              </div>
            </div>
          )}
          {selectedKey == 2 && (
            <div>
              <div className="sider-panel-title">数据源</div>
              <div className="sider-panel-content">
                <DataSourcePanel></DataSourcePanel>
              </div>
            </div>
          )}
          {selectedKey == 3 && <div>3333</div>}
        </div>
        <div className="board">
          <div
            className="canvas"
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={e => onDrop(e)}
          >
            {/* 渲染画布 */}
            {props?.canvasStore?.canvasData.map((i: ComponentItem) => {
              const {
                data: { type, props, children },
                style,
                uuid,
              } = i;
              return (
                <CanvasWrapper
                  onMouseDown={() => onMouseDown(i)}
                  canvasData={i}
                  key={uuid}
                  style={style}
                  selected={uuid === selectedComponent?.uuid}
                >
                  {React.createElement(injectComponents[type], props, children)}
                </CanvasWrapper>
              );
            })}
          </div>
        </div>
        <div className="settings">
          {selectedComponent && (
            <Form key={selectedComponent.uuid}>
              {selectedComponent?.settings?.map(i => {
                return (
                  <FormItem label={i.desc}>
                    <Input
                      type={i.type}
                      suffix={i.suffix}
                      onChange={e => {
                        console.log(e.target.value);
                        const comp = _.cloneDeep(
                          props.canvasStore.canvasData.find(
                            i => i.uuid === selectedComponent.uuid,
                          ),
                        );
                        if (i.key === 'children') {
                          comp.data.children = [e.target.value];
                        } else {
                          if (i.suffix) {
                            comp.data.props[i?.key] = e.target.value + i.suffix;
                          } else {
                            comp.data.props[i?.key] = e.target.value;
                          }
                        }
                        props.canvasStore.editCanvasData(comp.uuid, comp);
                        console.log(comp.uuid, comp.data.props[i.key], i.key);
                        useForceUpdate();
                      }}
                      defaultValue={(() => {
                        const comp = _.cloneDeep(
                          props.canvasStore.canvasData.find(
                            i => i.uuid === selectedComponent.uuid,
                          ),
                        );
                        if (i.key === 'children') {
                          return comp.data.children;
                        } else {
                          if (i.suffix) {
                            return (comp.data.props[i?.key] + '').split(
                              i.suffix,
                            )[0];
                          } else {
                            return comp.data.props[i?.key];
                          }
                        }
                      })()}
                    ></Input>
                  </FormItem>
                );
              })}
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default inject('canvasStore')(observer(MainPage));
