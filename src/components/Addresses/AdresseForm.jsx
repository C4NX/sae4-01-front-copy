import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AdresseItem from './AdresseItem';
import { getMyAddresses, saveAddress, deleteAddress } from '../../api/TakeAVetClient';
import Loading from '../Loading';

export default function AdresseForm(props) {
  const { className } = props;

  const [adresses, setAdresses] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    getMyAddresses().then((data) => {
      console.log('data', data);
      setAdresses(data.member);
      setIsBusy(false);
    });
  }, [adresses === undefined]);

  const refreshAdresses = () => {
    setAdresses(undefined);
  };

  const handleEdit = (data, id) => {
    setFormData(data);
    setSelectedId(id);
  };

  const handleCancel = () => {
    setSelectedId(null);
    setFormData({});
  };

  const handleDelete = (data, id) => {
    setIsBusy(true);
    deleteAddress(id).then((isDeleted) => {
      if (isDeleted) {
        console.log(`Deleted ${id}`);
        refreshAdresses();
      }
    }).catch((err) => {
      console.log('err', err);
      setIsBusy(false);
    });
  };

  const saveOrInsert = () => {
    const dataToBeSend = {
      name: formData.name,
      ad: formData.ad,
      pc: formData.pc,
      city: formData.city,
    };

    console.log('saveOrInsert', selectedId, !selectedId, dataToBeSend);
    setIsBusy(true);
    saveAddress(!selectedId, selectedId, dataToBeSend).then((data) => {
      if (data) {
        refreshAdresses();
        handleCancel();
      }
    }).catch((err) => {
      console.log('err', err);
      setIsBusy(false);
    });
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={className}>
      <div className="d-flex flex-column gap-2">
        {adresses ? (
          <ol className="list-group list-group-flush border border-1">
            {adresses.map((adresse) => (
              <li key={adresse.id} className={`list-group-item ${adresse.id === selectedId && 'text-sucess'}`}>
                <AdresseItem
                  data={adresse}
                  onEdit={(data) => handleEdit(data, adresse.id)}
                  onDelete={(data) => handleDelete(data, adresse.id)}
                  disabled={isBusy}
                />
              </li>
            ))}
          </ol>
        ) : <Loading />}
        <div className="border border-1 p-4">
          <div className="d-flex gap-1">
            <input className="form-control" type="text" name="name" placeholder="Nom de l'adresse" value={formData.name ?? ''} onChange={handleChangeValue} />
            <input className="form-control" type="text" name="ad" placeholder="Adresse" value={formData.ad ?? ''} onChange={handleChangeValue} />
            <input className="form-control" type="text" name="pc" placeholder="Code postal" value={formData.pc ?? ''} onChange={handleChangeValue} />
            <input className="form-control" type="text" name="city" placeholder="Ville" value={formData.city ?? ''} onChange={handleChangeValue} />
            <button type="button" className="btn btn-outline-primary" onClick={() => { saveOrInsert(); }} disabled={isBusy}>{selectedId ? 'Modifier' : 'Ajouter'}</button>
            {selectedId && <button type="button" className="btn btn-outline-secondary" onClick={() => { handleCancel(); }} disabled={isBusy}>Annuler</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

AdresseForm.propTypes = {
  className: PropTypes.string,
};

AdresseForm.defaultProps = {
  className: '',
};
