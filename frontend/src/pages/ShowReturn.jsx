import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowReturn = () => {
  const [Return, setReturn] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/returns/${id}`)
      .then((response) => {
        setReturn(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Return</h1>
      {loading ? (
        <Spinner />
      ) : Return ? (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="m-4">
            <span className="text-xl me-4 text-gray-500">ID:</span>
            <span>{Return._id}</span>
          </div>
          
          <div className="m-4">
            <span className="text-xl me-4 text-gray-500">ID:</span>
            <span>{Return.id}</span>
          </div>

          <div className="m-4">
            <span className="text-xl me-4 text-gray-500">ProductName:</span>
            <span>{Return.productName}</span>
          </div>

          <div className="m-4">
            <span className="text-xl me-4 text-gray-500">Description:</span>
            <span>{Return.Description}</span>
          </div>

          <div className="m-4">
            <span className="text-xl me-4 text-gray-500"> UploadImage:</span>
            <span>{Return.UploadImage}</span>
          </div>

          <div className="m-4">
            <span className="text-xl me-4 text-gray-500">Create Time:</span>
            <span>{new Date(Return.createdAt).toString()}</span>
          </div>

          <div className="m-4">
            <span className="text-xl me-4 text-gray-500">Last Update Time:</span>
            <span>{new Date(Return.updatedAt).toString()}</span>
          </div>
        </div>
      ) : (
        <p>Return not found.</p>
      )}
    </div>
  );
};

export default ShowReturn;
