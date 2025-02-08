'use client'
import { useSearchParams } from 'next/navigation'; // Import từ Next.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TypeSelector from './type';
import AreaSelector from './area';
import FilterSelector from './filter';
import ResultFood from './result';

const Page: React.FC = () => {
    const searchParams = useSearchParams(); 
    const selectedCategory= searchParams?.get('category'); 
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (selectedCategory) {
            const token = localStorage.getItem("token");
            const encodedCategory = encodeURIComponent(selectedCategory); 

            axios.get(`http://localhost:3300/restaurants/getbycategory/${encodedCategory}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setItems(res.data);
            })
            .catch((err) => console.error("Lỗi API:", err));
        }
    }, [selectedCategory]); 

    return (
        <>
            <div className='w-full flex flex-row justify-between items-center border-b border-solid'>
                <div className='flex flex-row gap-3'>
                    <AreaSelector />
                    <TypeSelector />
                </div>
                <div className='flex items-center justify-center '>
                    <FilterSelector />
                </div>
            </div>
            <div className='my-3 flex flex-row'></div>
            <ResultFood items={items} />
        </>
    );
};

export default Page;
