import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '@fullcalendar/core';
import {
  animalImageUploadUrl, getAnimalImages, toBaseUrl, uploadFromInput, deleteImageFromAnimal,
} from '../../api/TakeAVetClient';
import getIdFromHydraUrl from '../../services/transformers/getIdFromHydraUrl';
import Loading from '../Loading';
import openFileSelector from '../../services/utils/openFileSelector';

function findSelectedImageIndex(carousel) {
  const selectedImage = carousel.querySelector('.carousel-item.active');
  return +selectedImage.getAttribute('data-image-id');
}

function createImageData(contentUrl, createdAt, id) {
  return {
    url: toBaseUrl(contentUrl),
    description: `Mis en ligne le ${formatDate(new Date(createdAt), {
      year: 'numeric', month: 'long', day: 'numeric', locale: 'fr',
    })}`,
    id: getIdFromHydraUrl(id),
  };
}

export default function AnimalSlideshow(props) {
  const {
    animalId, className, name, width, height, ownerMode,
  } = props;
  const [imageArray, setImageArray] = useState(null);
  const [error, setError] = useState(null);
  const carouselRef = useRef();

  const customStyle = {
    width,
    height,
  };

  const onAddClick = () => {
    openFileSelector((event) => {
      console.log(event.target.files);
      uploadFromInput(animalImageUploadUrl(animalId), event.target)
        .catch((e) => {
          console.error(e);
        })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setImageArray((prev) => [...prev, createImageData(response.contentUrl, response.createdAt, response['@id'])]);
        });
    }, 'image/*');

    console.log('add');
  };

  const onRemoveClick = () => {
    if (!imageArray || imageArray.length === 0) {
      return;
    }

    deleteImageFromAnimal(animalId, findSelectedImageIndex(carouselRef.current))
      .then(() => {
        setImageArray(
          (prev) => prev.filter(
            (image) => image.id !== findSelectedImageIndex(carouselRef.current),
          ),
        );
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getAnimalImages(animalId)
      .then((response) => {
        setImageArray(response.member.map((image) => createImageData(image.contentUrl, image.createdAt, image['@id'])));
        console.log(`[AnimalSlideshow] ${response.member.length} images trouvées pour l'animal #${animalId}`);
      })
      .catch((e) => {
        console.error(`[AnimalSlideshow] Erreur lors de la récupération des images de l'animal #${animalId}`, e);
        setError(e.message ?? 'Une erreur est survenue');
      });
  }, [animalId]);

  return (
    !imageArray
      ? (
        <Loading error={error} text="Chargement des images..." centered />
      ) : (
        <div>
          <div id={name} style={customStyle} className={`carousel slide ${className}`}>
            <div className="carousel-indicators">

              {imageArray.map((imageInfo, i) => (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <button type="button" data-bs-target={`#${name}`} data-bs-slide-to={i} className={i === 0 && 'active'} aria-current={i === 0 && 'true'} />
              ))}
            </div>
            <div className="carousel-inner" ref={carouselRef}>
              {imageArray.map((imageInfo, i) => (
                <div className={`carousel-item ${i === 0 ? 'active' : ''}`} data-image-id={imageInfo.id}>
                  <img src={imageInfo.url} className="d-block w-100" alt="Un animal" />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>
                      Image #
                      {i + 1}
                    </h5>
                    <p>{imageInfo.description}</p>
                  </div>
                </div>
              ))}
              <button className="carousel-control-prev" type="button" data-bs-target={`#${name}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target={`#${name}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          {ownerMode && (
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-primary" onClick={onAddClick}>Ajouter une image</button>
            <button type="button" className="btn btn-danger" onClick={onRemoveClick}>Supprimer une image</button>
          </div>
          )}
        </div>
      )
  );
}

AnimalSlideshow.propTypes = {
  animalId: PropTypes.number.isRequired,
  className: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  ownerMode: PropTypes.bool,
};

AnimalSlideshow.defaultProps = {
  className: '',
  name: 'animalCarousel',
  width: null,
  height: null,
  ownerMode: false,
};
