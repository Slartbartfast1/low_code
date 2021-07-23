import React, { useEffect } from 'react';
import type { FC } from 'react';
import { uuid, getElementLeft, getElementTop } from '../../pages/utils/index';
import './style.less';

export const ComponentWrapper: FC<any> = (props) => {
  const { componentId, desc } = props
  const onDragStart = (e) => {
    let pageX = e.pageX;
    let pageY = e.pageY;
    const el = document.getElementById(componentId)

    // 获取指针相对元素的偏移量
    const pointerOffset = {
      left: pageX - getElementLeft(el),
      top: pageY - getElementTop(el),
    }
    console.log(pointerOffset, componentId)
    e.dataTransfer.setData("pointerOffset", JSON.stringify(pointerOffset))
    e.dataTransfer.setData("isCreate", true)
    e.dataTransfer.setData('componentId', componentId);
  }
  const onDragEnd = (e) => {
  }

  const onMouseDown = (e) => {
  }

  return <div className='component-wrapper'>
    <div>
      <div>
        <div className='component-wrapper-title'>{desc}</div>
        <div draggable
          id={componentId}
          onDragStart={onDragStart} onMouseDown={onMouseDown} className={`component-wrapper-content`} data-id={`${uuid()}`} {...props} style={props.style}>
          {props.children}
        </div>
      </div>
    </div>
  </div>

}
