'use client'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const Page: React.FC = () => {
    const router = useRouter();
    const [formres, setForm] = useState<any>({});
    const [loading, setLoading] = useState(false); // Để theo dõi trạng thái gửi request

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3300/user/register", formres);
            toast("chuc mung ban dang ky thanh cong")
            
            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (error) {
            console.error("Đăng ký không thành công", error);
            // Xử lý lỗi nếu có
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="mt-28 w-1/3 bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
                <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
                    Đăng Kí
                </div>
                <div className="flex flex-row w-full gap-2">
                    <Input
                        placeholder="Họ Và Tên "
                        className="h-[40px]"
                        onChange={handleChange}
                        name="full_name"
                    />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input
                        placeholder="Tên đăng nhập"
                        className="h-[40px]"
                        name="account"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input
                        placeholder="Số điện thoại"
                        className="h-[40px]"
                        name="phone"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input
                        placeholder="Địa chỉ"
                        className="h-[40px]"
                        name="address"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input
                        placeholder="Email"
                        className="h-[40px]"
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col w-full ">
                    <Input.Password
                        placeholder="Mật khẩu"
                        className="h-[40px]"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <button
                        className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Đang đăng ký..." : "Đăng Ký"}
                    </button>
                </div>
                <div className="flex items-center justify-center gap-1">
                    <span className="text-gray-600">Bạn đã có tài khoản? </span>
                    <Link className="text-beamin cursor-pointer" href={"/login"}>
                        Đăng nhập
                    </Link>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};
export default Page;
