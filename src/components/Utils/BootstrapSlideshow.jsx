import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

export default function BootstrapSlideshow(props) {
  const { id, slides, autoplay } = props;

  return (
    <div id={id} className="carousel slide p-4 w-auto" data-bs-ride="carousel" data-bs-interval={autoplay ? 5000 : false}>
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : ''}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={slide.src} className="d-block w-100" alt={slide.alt} />
            <div className="carousel-caption d-none d-md-block bg-black-opacity-80 rounded-3 p-1">
              <h5>
                {(slide.icon && (slide.iconSide === 'left' || !slide.iconSide)) && (
                <>
                  <FontAwesomeIcon icon={slide.icon} className="me-2" />
                  {' '}
                </>
                )}
                {slide.title}
                {(slide.icon && slide.iconSide === 'right') && (
                <>
                  {' '}
                  <FontAwesomeIcon icon={slide.icon} className="me-2" />
                </>
                )}
              </h5>
              <p>
                {slide.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

BootstrapSlideshow.propTypes = {
  id: PropTypes.string,
  slides: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    iconSide: PropTypes.string,
  })),
  autoplay: PropTypes.bool,
};

BootstrapSlideshow.defaultProps = {
  id: 'carouselCaptions',
  slides: [
    {
      src: 'https://picsum.photos/800/400?random=1',
      alt: 'First slide',
      title: 'First slide label',
      text: 'Some representative placeholder content for the first slide.',
      icon: faRocket,
      iconSide: 'left',
    },
  ],
  autoplay: false,
};
