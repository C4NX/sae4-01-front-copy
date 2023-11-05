import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import React from 'react';
import BasePage from '../components/BasePage';

export default function BaseParentRoute(props) {
  const { title, splited } = props;
  return (
    <BasePage title={title}>
      {splited && (<hr />)}
      <Outlet />
    </BasePage>
  );
}

BaseParentRoute.propTypes = {
  title: PropTypes.string,
  splited: PropTypes.bool,
};

BaseParentRoute.defaultProps = {
  title: null,
  splited: false,
};
