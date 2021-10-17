import { LazyExoticComponent } from 'react';

export interface RouterType {
  path: string;
  key: string;
  component?: LazyExoticComponent<any>;
  children?: Array<RouterType>;
  title?:string
}
