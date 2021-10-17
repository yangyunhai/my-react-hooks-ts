import React, { FC } from 'react';

const MainLayout: FC = props => {
  return <section className="app-wrapper">
           { props.children }
         </section>;
};

export default MainLayout;