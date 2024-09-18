import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateReturns = () => {
  const [id, setID] = useState('');
  const [productName, setproductName] = useState('');
  const [description, setDescription] = useState('');
  const [uploadImage, setUploadImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveReturn = () => {
    const data = {
      ID: id,
      ProductName: productName,
      Description: description,
      UploadImage: uploadImage,
    };

    setLoading(true);

    axios
      .post('http://localhost:5555/returns', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console for details.');
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create return</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setID(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> ProductName</label>
          <input
            type="number"
            value={productName}
            onChange={(e) => setproductName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">UploadImage</label>
          <input
            type="text"
            value={uploadImage}
            onChange={(e) => setUploadImage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveReturn}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateReturns;
