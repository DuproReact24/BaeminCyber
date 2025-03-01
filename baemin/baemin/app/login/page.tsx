'use client'
import { EyeInvisibleOutlined, EyeTwoTone, FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
const Page: React.FC = () => {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [formres, setForm] = useState<any>({});
    const [loading, setLoading] = useState(false)
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
      
        try {
            const response = await axios.post("http://localhost:3300/user/login", formres).then((res) => { 
           
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("user_id",res.data.id)
                localStorage.setItem("address",res.data.address)
                toast("Wow so easy!");
                setTimeout(() => {
                    router.push("/dashboard");
                },1500);
             });
            
           

           
        } catch (error) {
            console.error("Đăng ký không thành công", error);
            // Xử lý lỗi nếu có
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
             <ToastContainer />
            <div className="mt-14 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
                <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
                    Đăng Nhập
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input placeholder="Email" className="h-[40px]" onChange={handleChange}
                        name="email"/>
                </div>
                <div className="flex flex-col w-full mt-3">
                    <Input.Password
                        placeholder="Mật khẩu"
                        className="h-[40px]"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={handleChange}
                        name="password"
                    />
                </div>
                <div className="flex flex-col w-full mt-3">
                    <button className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg" onClick={handleSubmit}>Đăng Nhập</button>
                    <div className="flex flex-row justify-between items-center w-full text-sm text-beamin">
                        <span className="cursor-pointer" >Quên mật khẩu </span>
                        <span className="cursor-pointer">Đăng nhập bằng SMS </span>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-sm text-gray-600">HOẶC</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-5 h-[40px] ">
                        <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
                            <FacebookOutlined />
                            <span>Facebook</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
                        <GoogleOutlined />
                            <span>Google</span>
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-gray-600">Bạn mới biết đến Baemin? 
                        </span>
                        <Link className="text-beamin cursor-pointer" href={"/register"}> Đăng kí</Link>
                    </div>
            </div>
        </>


    );

}
export default Page;