import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

export default function BasePage(props) {
  const {
    // eslint-disable-next-line react/prop-types
    title, columnResponsive, children, useFooter, useHeader, fullSizeCentered,
  } = props;

  return (
    <>
      {useHeader && <Header />}
      <main>
        <div className={
          `main-content${columnResponsive ? ' col-row-responsive' : ''}${fullSizeCentered ? ' full-size-centered-main-content' : ''}`
        }
        >
          {title !== null ? <div className="main-title"><h1>{title}</h1></div> : null}
          {children}
        </div>
      </main>
      {useFooter && <Footer />}
    </>
  );
}

BasePage.propTypes = {
  title: PropTypes.string,
  columnResponsive: PropTypes.bool,
  useHeader: PropTypes.bool,
  useFooter: PropTypes.bool,
  fullSizeCentered: PropTypes.bool,
};

BasePage.defaultProps = {
  title: null,
  columnResponsive: false,
  useHeader: true,
  useFooter: true,
  fullSizeCentered: false,
};
