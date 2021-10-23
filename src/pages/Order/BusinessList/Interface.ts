import { ReactElement } from 'react';
interface DynamicModalType {
  title: string;
  comKey: string;
}

export interface TableColumnType {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: any) => ReactElement;
}

export interface TableDataType {
  id: Number;
  userName: string;
  pic: string;
  num: Number;
  sumNum: Number;
  title: string;
  createtime: string;
}

export interface comMapInte {
  [key: string]: DynamicModalType;
}
