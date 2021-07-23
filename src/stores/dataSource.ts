// import { observable, action} from "mobx";
// import { ComponentItem } from '../types/index';
// import * as  _ from 'lodash'

// class DataStore {

//   @observable dataSource = [];
//   @observable componentsData = [];

//   @action
//   addCanvasData(data: ComponentItem) {
//     this.canvasData.push(data)
//   }

//   @action
//   editCanvasData(uuid: string, data: ComponentItem) {
//     const index = this.canvasData.findIndex(i => i.uuid === uuid);
//     this.canvasData[index] = data;
//   }

//   @action
//   setComponentsData(data) {
//     // debugger;
//     this.componentsData = data;
//   }

// }

// export default DataStore;