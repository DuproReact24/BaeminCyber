'use client'
import HeaderNav from "@/components/headerNav";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const router = useRouter();
    const [items1, setItems] = useState<any[]>([]);
    const [todayFood, setTodayFood] = useState<any>({
        title: 'Hôm Nay ăn gì',
        items: [],
    });
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


    const banneritems = [
        { id: '1', name: 'anh 1', url: '/images/map1.png' },
        { id: '2', name: 'anh 2', url: '/images/map2.png' },
        { id: '3', name: 'anh 3', url: '/images/map3.png' },
        { id: '4', name: 'anh 4', url: '/images/map4.png' }
    ];


    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3300/restaurants/getall", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => { 
            setItems(res.data);
            setTodayFood({
                title: 'Hôm Nay ăn gì',
                items: res.data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    address: item.address || 'Địa chỉ chưa có',
                    img: `http://localhost:3300/public/images/${item.image}`,
                    kind: item.category || 'Loại món',
                })),
            });
        })
        .catch(() => { router.push('/login') });
    }, []);


    useEffect(() => {
        if (selectedCategory) {
            const token = localStorage.getItem("token");
            axios.get(`http://localhost:3300/restaurants/getbycategory/${selectedCategory}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setTodayFood({
                    title: `Món ăn thuộc danh mục: ${selectedCategory}`,
                    items: res.data.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        address: item.address || 'Địa chỉ chưa có',
                        img: `http://localhost:3300/public/images/${item.image}`,
                        kind: item.category || 'Loại món',
                    })),
                });
              
            });
        }
    }, [selectedCategory]);

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 pt-3 pl-8 pr-8 z-40">
                    <div className="flex flex-col fixed bg-white w-64 rounded-2xl pl-3 pt-2 pb-5 gap-3">
                        <span>Thực đơn</span>
                        {items1.map((item, index) => (
                            <div 
                                key={index} 
                                className={`flex flex-col gap-3 cursor-pointer hover:bg-slate-100 ${
                                    selectedCategory === item.category ? 'bg-gray-200' : ''
                                }`}
                                onClick={() => setSelectedCategory(item.category)}
                            >
                                <div className="flex flex-row items-center gap-1">
                                    <Image 
                                        src={`http://localhost:3300/public/images/${item.image}`} 
                                        width={30} 
                                        height={30} 
                                        alt={item.description} 
                                    />
                                    <span>{item.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-9 w-full pt-3 pr-8 gap-3 flex flex-col">
                    <ScrollBar items={banneritems} />
                    <ScrollFood items={todayFood} />
                </div>
            </div>
        </>
    );
}
