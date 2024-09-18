import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
    const [returns, setReturns] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/returns')
            .then((response) => {
                setReturns(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Returns List</h1>
                <Link to='/returns/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>ID</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'> productName</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Description</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'> UploadImage</th>
                  
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returns.map((Return, index) => (
                            <tr key={Return._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {Return.ID}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Return.productName}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Return.Description}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Return.UploadImage}
                                </td>
                                
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/returns/details/${Return._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/returns/edit/${Return._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/returns/delete/${Return._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;
