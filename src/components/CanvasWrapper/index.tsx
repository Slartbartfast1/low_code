import React, { useState } from 'react';
import type { FC } from 'react';
import { getElementLeft, getElementTop, uuid as getUuid } from '../../pages/utils/index';
import './style.less'

export const CanvasWrapper: FC<any> = (props) => {
  const {
    canvasData: {
      uuid,
    },
    selected,
  } = props
  const onDragStart = (e) => {
    let pageX = e.pageX;
    let pageY = e.pageY;
    const el = document.getElementById(uuid)
    const pointerOffset = {
      left: pageX - getElementLeft(el),
      top: pageY - getElementTop(el),
    }
    console.log(pointerOffset, uuid)
    e.dataTransfer.setData("pointerOffset", JSON.stringify(pointerOffset))
    e.dataTransfer.setData("startPos", JSON.stringify({ pageX, pageY }));
    e.dataTransfer.setData("uuid", uuid);
  }
  const onDragEnd = (e) => {
    console.log(e, 1111)
  }

  // const onMouseDown = (e) => {
  //   console.log(e.target, 222);
  // }

  return <div draggable
    id={uuid}
    onDragStart={onDragStart}  className={`canvas-wrapper`} {...props} style={props.style}>
    <div className={selected?'selected':''}>
    {props.children}
    </div>
  </div>
}

