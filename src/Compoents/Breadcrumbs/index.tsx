import React, { FC,useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import routes from '@/routes/index';
import { useHistory } from "react-router-dom";
import './index.less';
interface selectItem {
  title:string,
  path:string,
}

const getBreadcrumbs=(pathname:string):Array<selectItem>=>{
  let mens:Array<selectItem>=[];
  for(let i=0;i<routes.length;i++){
    mens=[];
    const item=routes[i];
    mens.push({title:item.title,path:item.path});
    if(item.path===pathname){
      return mens;
    }else if(item.children){
      for(let j=0;j<item.children.length;j++){
        const citem=item.children[j];
        if(citem.path===pathname){
          mens.push({title:citem.title,path:citem.path});
          return mens; 
        }
      }
    }
 }
  return mens;
}

const Breadcrumbs: FC = () => {
  const history = useHistory();
  const [mens,setMens]=useState([]);
  useEffect(()=>{
    const breadcrumbs=getBreadcrumbs(history.location.pathname);
    if(breadcrumbs.length>0){
      setMens(breadcrumbs)
    }
  },[history.location.pathname])
  return (
    <Breadcrumb className="breadcrumb-warp">
      {
        mens.map((item:selectItem,index:number)=>{
          return  <Breadcrumb.Item key={index}>
                    {item.title}
                  </Breadcrumb.Item>;
        })
      }
     
    </Breadcrumb>
  );
};
export default Breadcrumbs;
