import React, { FC,useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import routes from '@/routes/index';
import { useHistory } from "react-router-dom";
import { RouterType } from '@/routes/interface';
import './index.less';

interface selectItem {
  title:string,
  path:string,
}

/**
 * 根据路由名称获取导航数据
 * @param pathname 
 * @returns 
 */
const getBreadcrumbs=(pathname:string):Array<selectItem>=>{
  let list:Array<selectItem>=[];

  const forChildren=(item:RouterType)=>{
    for(let j=0;j<item.children.length;j++){
      const citem=item.children[j];
      if(citem.path===pathname){
        return { title:citem.title,path:citem.path }; 
      }
    }
  }

  for(let i=0;i<routes.length;i++){
    list=[];
    const item=routes[i];
    list.push({title:item.title,path:item.path});
    if(item.path===pathname){
      return list;
    }else if(item.children){
      const isChildren=forChildren(item);
      if(isChildren){
        list.push(isChildren);
        return list;
      }
    }
 }
  return list;
}

/**
 * 过滤前后不可点击的
 * @param index 
 * @param list 
 * @returns 
 */
const filterAround=(index:number,list:Array<selectItem>)=>{
  return (index==0&&list.length<3)||index==list.length-1
}

const Breadcrumbs: FC = () => {
  const history = useHistory();

  const [list,setList]=useState<Array<selectItem>>([]);
  
  const onPush=(index:number)=>{
    if(!filterAround(index,list)){
      history.push(`#/${list[index].path}`);
    }
  }

  useEffect(()=>{
    const breadcrumbs=getBreadcrumbs(history.location.pathname);
    if(breadcrumbs.length>0){
      setList(breadcrumbs)
    }else{
      setList([])
    }
  },[history.location.pathname])
  return (
    <Breadcrumb className="breadcrumb-warp">
      {
        list.map((item:selectItem,index:number)=>{
          return  <Breadcrumb.Item key={index}>
                    <a onClick={()=>onPush(index)}>{item.title}</a>
                  </Breadcrumb.Item>;
        })
      }
     
    </Breadcrumb>
  );
};

export default Breadcrumbs;
