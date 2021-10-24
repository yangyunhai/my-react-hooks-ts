import { Modal } from 'antd';
import React, { FC } from 'react';
import './index.less';

const defaultProps={
  visible: false,
  title: null,
  onCancel: () => {}
}

interface Props {
  children?:any,
  visible: boolean;//弹框状态
  title: string;//弹框标题
  onCancel: () => void;//弹框组件关闭事件
}



const DynamicModal: FC<Props> = (props: Props=defaultProps) => {
  return (
    <Modal
      className="dynamic-modal-warp"
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}>
       <React.Suspense fallback={null}>
         {props.children}
       </React.Suspense>
    </Modal>
  );
};

export default DynamicModal;
