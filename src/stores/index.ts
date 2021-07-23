import CanvasStore from './canvasStore';

export const createMobxStores = () => {
  return { 
    canvasStore: new CanvasStore(), 
  }
}