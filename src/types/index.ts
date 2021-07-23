export interface ComponentItem {
  desc: string,
  componentId: string,
  data: {
    type: string,
    props: any,
    children: any[],
  },
  style: any,
  uuid: any,
  settings: object[]
}

export interface dataSourceItem {
  type: 'normal'|'promise',
  requestUrl?: string,
  value?: any,
  getter: string,
  uuid: string,
}