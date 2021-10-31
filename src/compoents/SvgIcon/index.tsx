import React, { FC } from 'react';
import './index.less';

interface Props {
  icon: string;
  className?: string;
}

const SvgIcon: FC<Props> = (props: Props) => {
  const { icon,className } = props;
  return (
    <svg aria-hidden='true' className={'svg-icon '+className}>
      <use xlinkHref={'#icon-' + icon} />
    </svg>
  );
};

export default SvgIcon;
