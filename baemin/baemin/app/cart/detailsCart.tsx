import { Button } from "antd";
import axios from "axios";
import { Butterfly_Kids } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function DetailsCart({ Details }: {
    
    Details: any[]
}) {    

        const handleDel =(id:number)=>{
            
            
                axios.post('http://localhost:3300/cart/deleted-cart',{
                    id:id
                }).then(() => {
    
                    window.location.reload()
    
                 })
         

           

        }

    return (
        <>
       
           
            <div className="w-full flex flex-col  bg-white rounded-md ">
                
                    {/* <div className=" flex flex-row my-7 ml-8 items-center gap-3">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 " />
                        <span className="text-base font-normal"> {Details.image}</span> 
                         <div className=" bg-beamin p-1 rounded-md">
                            {items.quandoitac && (
                                <span className="text-sm font-normal text-white">
                                    Quán đối tác
                                </span>
                            )}
                        </div> 
                    </div> */}
                    <div className=" w-full border-t border-b border-solid border-gray-600 py-3">
                            {Details?.map((item: any, index: any) => (
                                <div key={index} className={index === item.length - 1 ? "w-full grid grid-cols-12" : "w-full grid grid-cols-12 border-b border-solid border-x-gray-300"}
                                >
                                    <div className="pl-8  col-span-4 flex items-center flex-row gap-3">
                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 " />
                                        <div className="relative h-36 w-36">
                                            <Image layout="fill" objectFit="cover" src={`http://localhost:3300/public/images/${item.image}`} alt={""} />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                        
                                            <span className="text-sm text-gray-600">{item.description}</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                        {item.name}
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                        <input type="number" id="quantity" className="w-16 text-center border border-gray-300 rounded" defaultValue={item.total} min="1" max="100" />

                                    </div>
                                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                        ₫{item.total_price}
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                        <span className=" hover:text-red-600 cursor-pointer" onClick={() => { handleDel(item.id) }}>Xóa</span>
                                    </div>

                                </div>
                            ))}
                        </div>
                       
                
            </div>
            
            


        </>
    )

}