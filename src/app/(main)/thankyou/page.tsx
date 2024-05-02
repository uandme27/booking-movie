"use client"
import React, { useEffect, useState } from 'react'
import { Button, Modal, Result } from 'antd';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
export default function Page() {
    const searchParams: any = useSearchParams()
    console.log(searchParams.get('name'));
    searchParams.forEach((value: any, key: any) => {
        console.log(`${key}: ${value}`);
    });
    const formatPrice = (price: any) => {
        return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='flex items-center justify-center h-screen'>
            <Result
                status="success"
                title="Cảm ơn bạn đã đặt vé xem phim của ForToNight !"
                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                    <Button key="console" disabled>
                        Lịch sử mua vé
                    </Button>,
                    <Button key="showTicket" onClick={showModal}>Xem vé vừa mua</Button>,
                ]}
            />


            <Modal title="Chi tiết vé xem phim"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <button type="button" key='1' onClick={handleCancel} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Lịch sử mua hàng
                    </button>
                    ,
                    <button key='2' onClick={handleOk} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Xác nhận
                    </button>
                    ,

                ]}
            >
                <div className="flex flex-col md:flex-row">
                    <div className="order-2 mx-auto grow px-6 py-5 md:order-1">
                        <div><ul className="flex items-center space-x-2">
                            <li className="md:text-lg">
                                <b>{searchParams.get('nameMovie')}</b>
                            </li>
                        </ul>
                            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-4 border-t border-dashed border-gray-200 pt-4"><li className="flex items-end justify-between space-x-10">
                                <div><span className="block font-semibold text-gray-500" >THỜI GIAN</span>
                                    <div className="text-gray-800"><b>{moment(searchParams.get('startTime')).format('LT')}  ~  {moment(searchParams.get('startTime')).format('LT')}</b></div></div></li><li className="flex items-end justify-between space-x-10">
                                    <div><span className="block font-semibold text-gray-500" >NGÀY CHIẾU</span>
                                        <div className="text-gray-800"><b>{moment(searchParams.get('startTime')).format('DD-MM-YYYY')}</b></div></div></li><li className="flex items-end justify-between space-x-10 col-span-2">
                                    <div><span className="block font-semibold text-gray-500" >RẠP</span>
                                        <div className="text-gray-800">
                                            <b>{searchParams.get('name')}</b>
                                        </div>
                                        <div className="text-sm text-gray-500">{searchParams.get('address')}</div></div></li><li className="flex items-end justify-between space-x-10">
                                    <div><span className="block font-semibold text-gray-500" >PHÒNG CHIẾU</span>
                                        <div className="text-gray-800">
                                            <b>Phòng {searchParams.get('nameRoom')}</b>
                                        </div></div></li><li className="flex items-end justify-between space-x-10">
                                    <div>
                                    </div></li></ul><ul className="mt-4 border-t border-dashed border-gray-200 pt-4"><li className="flex items-end justify-between space-x-10 col-span-2">
                                        <div><span className="block font-semibold text-gray-500" >GHẾ</span>
                                            <div className="text-gray-800">
                                                <b>{searchParams.get('tenghe')}</b>
                                            </div></div>
                                        <div className="text-gray-800"><b>{formatPrice(searchParams.get('price'))}đ</b></div></li></ul></div><ul className="mt-4 border-t border-dashed border-gray-200 pt-4"><li className="flex items-end justify-between space-x-10">
                                            <div>
                                                <div className="text-gray-800"><b>Tạm tính</b></div></div>
                                            <div className="text-gray-800"><b>{formatPrice(searchParams.get('price'))}đ</b></div></li></ul>
                        <div className=" mt-2 text-xs italic leading-normal text-gray-500">Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.</div></div>
                </div>
            </Modal>
        </div>
    )
}
