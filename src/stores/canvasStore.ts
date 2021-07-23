import { observable, action, configure, computed } from "mobx";
import { ComponentItem } from '../types/index';
import * as  _ from 'lodash'

class CanvasStore {

  @observable canvasData: ComponentItem[] = []; // 画布数据
  @observable componentsData = []; // 注册的组件数据
  @observable dataSource = {}; // 数据源
  @observable injectFunctions = []; // 注册的函数

  @action
  addCanvasData(data: ComponentItem) {
    this.canvasData.push(data)
  }

  @action
  editCanvasData(uuid: string, data: ComponentItem) {
    const index = this.canvasData.findIndex(i => i.uuid === uuid);
    this.canvasData[index] = data;
  }

  @action
  setComponentsData(data) {
    this.componentsData = data;
  }

}

export default CanvasStore;