'use client'
import React, { useEffect, useState } from 'react';
import { Alert, Flex, Spin } from 'antd';
import { Modal } from 'antd';
import { useGetBookedSeatsByIdQuery } from '@/app/redux/features/movie/cinema.service';
import { Avatar } from 'antd';
import ChonPhuongThucThanhToan from './ChonPhuongThucThanhToan';
import Image from 'next/image';
export default function Mdatve({ seats, id, startTime, endTime }: any) {
    const formatPrice = (price: any) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState(0);
    const soGhe = seats;
    const soGheMoiHang = 10;
    const soHang = Math.ceil(soGhe / soGheMoiHang);
    const { data: bookedSeats } = useGetBookedSeatsByIdQuery(id)
    const gheDaDat = bookedSeats?.data.bookedSeats.map((item: any) => parseInt(item, 10))
    // const gheDaDat = [33, 44, 5, 6, 7].map((item: any) => parseInt(item, 10))
    const [gheChon, setGheChon] = useState(Array.from({ length: soHang }, () => Array(soGheMoiHang).fill(false)));
    const [gheDaChon, setGheDaChon]: any = useState([]);
    const handleSelectSeat = (hang: any, ghe: any) => {
        if (gheDaDat?.includes(hang * soGheMoiHang + ghe + 1)) {
            return;
        }
        const newGheChon = [...gheChon];
        newGheChon[hang][ghe] = !newGheChon[hang][ghe];
        setGheChon(newGheChon);
        const gheIndex = hang * soGheMoiHang + ghe + 1;
        if (newGheChon[hang][ghe]) {
            setGheDaChon([...gheDaChon, gheIndex]);
        } else {
            setGheDaChon(gheDaChon.filter((ghe: any) => ghe !== gheIndex));
        }

    };
    const renderGhe = () => {
        const ghe: any = {};
        for (let i = 0; i < soHang; i++) {
            ghe[String.fromCharCode(65 + i)] = Array.from({ length: soGheMoiHang }, (_, index) => {
                const gheIndex = i * soGheMoiHang + index + 1;
                return {
                    status: gheDaDat?.includes(gheIndex),
                    selected: gheDaChon?.includes(gheIndex),
                    visible: gheIndex <= soGhe
                };
            });
        }
        return ghe;
    };
    const convertToTenGhe = (hang: any, ghe: any) => {
        return `${String.fromCharCode(65 + hang)}${ghe + 1}`;
    };
    // console.log('Ghế đã chọn:', gheDaChon.map((gheIndex: any) => convertToTenGhe(Math.floor((gheIndex - 1) / soGheMoiHang), (gheIndex - 1) % soGheMoiHang)));
    // console.log('Ghế:', gheDaChon);
    useEffect(() => {
        if (bookedSeats && gheDaChon.length > 0) {
            const newPrice = gheDaChon.length * bookedSeats?.data.price;
            setPrice(newPrice);
        } else {
            setPrice(0);
        }
    }, [gheDaChon]);
    return (
        <>
            {bookedSeats ? <div key={id} onClick={() => setOpen(true)} className="tracking-engage-btn-showtime group cursor-pointer whitespace-nowrap rounded-md border border-dark bg-dark-100/5 px-2 py-1 text-center text-tiny text-dark-600 hover:bg-white hover:text-dark-500">
                <strong className="text-md">{startTime}</strong> ~ {endTime}
            </div> : <Spin tip="Đang tải...">
                {/* <Alert
                    message="Bắt đầu ~ Kết thúc"
                    type="info"
                /> */}
            </Spin>
            }

            <Modal
                title="Chi tiết ghế ngồi"
                centered
                open={open}
                // onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={null}
            >
                <table className="w-full">
                    {Object.keys(renderGhe()).map((hang, index) => (
                        <tr key={index} className="flex justify-center">

                            {renderGhe()[hang].map((item: any, idx: any) => (
                                item.visible && <td key={idx} onClick={() => handleSelectSeat(index, idx)}>
                                    <div
                                        className={`h-10 font-semibold text-white w-12 p-1 m-1 flex justify-center items-center ${item.status ? 'bg-gray-600 cursor-no-drop' : (item.selected ? 'bg-red-500' : 'bg-lime-500')} rounded-lg border-gray-300  cursor-pointer`}
                                    >
                                        <span className="text-base">{convertToTenGhe(index, idx)}</span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </table>
                <div className="mt-3 w-full px-4 text-xs text-dark  bg-dark">
                    <div className="mx-auto grid w-fit grid-cols-3 gap-x-2 gap-y-2">
                        <div className="flex items-center space-x-1.5">
                            <div className="h-4 w-4 shrink-0 rounded-sm bg-gray-700 ">
                            </div>
                            <span>Đã đặt</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <div className="h-4 w-4 shrink-0 rounded-sm border border-white bg-pink-600">
                            </div>
                            <span>Ghế bạn chọn</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <div className="h-4 w-4 shrink-0 rounded-sm bg-lime-500">
                            </div>
                            <span className="break-all">Ghế thường</span>
                        </div>

                    </div>
                </div>


                <div className="rounded-t-xl bg-white px-4 py-4 sm:rounded-t-none ">
                    <div className=" grid grid-cols-1 divide-y divide-gray-200   text-sm">
                        <div className="pb-2">
                            <div className="flex space-x-2 pb-1 ">
                                <div><b className="text-base line-clamp-1 md:line-clamp-none ">{bookedSeats?.data.movie.name}</b></div></div>
                            <div>
                                <span className="block text-tiny text-orange-500 lg:text-sm"> {startTime} ~ {endTime}</span></div></div>
                        <div className="flex items-center justify-between space-x-3 py-1.5">
                            <span className="shrink-0 text-gray-500">Chỗ ngồi
                                <b className="text-dark text-orange-500 lg:text-sm ">
                                    <Avatar.Group shape="square" maxCount={10}>
                                        {gheDaChon.map((gheIndex: any) => convertToTenGhe(Math.floor((gheIndex - 1) / soGheMoiHang), (gheIndex - 1) % soGheMoiHang)).map((ghe: any, index: any) => (
                                            <Avatar className=' mx-2 px-4 bg-lime-500' key={index}>{ghe}</Avatar>
                                        ))}
                                    </Avatar.Group>
                                </b>
                            </span>
                            <div className="flex items-center space-x-2 rounded-lg border border-gray-200 px-3 py-1 invisible opacity-0">
                                <span>
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(239 68 68)" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="h-6 shrink-0 cursor-pointer text-white transition-all hover:opacity-70"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                                </svg>
                            </div>
                        </div>

                    </div>
                    <div className="flex items-center border-t border-gray-200 pt-3">
                        <div className=" flex-1"><span className="block text-sm text-gray-500 ">Tạm tính</span><b className="text-lg d">{formatPrice(price)}đ</b></div>
                        <div className=" shrink-0">
                            {/* <ThanhToanTienMat /> */}
                            {gheDaChon.length !== 0 ? <ChonPhuongThucThanhToan
                                data={
                                    bookedSeats?.data
                                }
                                ghedat={gheDaChon}
                                tenghe={gheDaChon.map((gheIndex: any) => convertToTenGhe(Math.floor((gheIndex - 1) / soGheMoiHang), (gheIndex - 1) % soGheMoiHang))}
                                tien={price}
                                id={id} /> :
                                ''
                            }

                        </div>
                    </div>
                </div>
            </Modal>


        </>
    );
};


