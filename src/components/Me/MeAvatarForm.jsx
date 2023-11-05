import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faHammer,
} from '@fortawesome/free-solid-svg-icons';
import { avatarUploadUrl, avatarUrl } from '../../api/TakeAVetClient';
import useAccount from '../../hooks/useAccount';

const IMAGE_ID = 'avatar-preview';

export function uploadFromInput(url, input) {
  const formData = new FormData();
  formData.append('file', input.files[0]);
  return fetch(url, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
}

export default function MeAvatarForm(props) {
  const { userId } = props;
  const [isUploading, setIsUploading] = useState(false);

  const { isAdmin, isFullyLoggedIn, getUser } = useAccount();

  const refreshAvatar = () => {
    const avatar = document.getElementById(IMAGE_ID);
    console.log('Refreshing avatar', avatar.src);
    avatar.src = `${avatar.src}?${new Date().getTime()}`;
  };

  const handleInput = (event) => {
    const input = event.target;
    setIsUploading(true);
    uploadFromInput(avatarUploadUrl(userId), input)
      .catch((error) => {
        console.error(error);
        input.type = 'text';
        input.type = 'file';
        setIsUploading(false);
      })
      .then((response) => response.json())
      .then((response) => {
        input.type = 'text';
        input.type = 'file';
        setIsUploading(false);
        refreshAvatar();
        console.log(response);
      });
  };

  return (
    <div className="m-2">
      <div className="d-flex flex-column gap-2 text-center justify-content-center align-items-center">
        <h2>Mon Avatar</h2>
        <div className="d-flex gap-2">
          {isFullyLoggedIn() && (
            isAdmin() && (
              <span className="badge text-bg-danger">
                <FontAwesomeIcon icon={faHammer} />
                Administateur
              </span>
            )
          )}
          {isFullyLoggedIn() && (
            getUser().isHusbandry && (
              <span className="badge text-bg-info">
                <FontAwesomeIcon icon={faBell} />
                {' '}
                Eleveur
              </span>
            )
          )}
        </div>
        <img
          id={IMAGE_ID}
          src={avatarUrl(userId)}
          alt="Impossible de charger l'avatar"
          width="258"
          className="rounded-circle"
        />
        {isUploading && <span className="text-info">Téléversement en cours...</span>}
        <input className="form-control" type="file" name="file" onInput={handleInput} accept="image/png, image/jpeg, image/webp" disabled={isUploading} />
      </div>
    </div>
  );
}

MeAvatarForm.propTypes = {
  userId: PropTypes.number.isRequired,
};
