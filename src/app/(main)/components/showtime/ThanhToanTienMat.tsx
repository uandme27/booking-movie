import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/navigation'
import { useCheckoutTienMatMutation, useGetBranchByIdBranchQuery } from '@/app/redux/features/movie/cinema.service';
import { FormProps } from 'antd/lib';

export default function ThanhToanTienMat({ data, fullData, renderTT }: any) {

    const router = useRouter()
    const formatPrice = (price: any) => {
        return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const [isModalOpen, setIsModalOpen] = useState(renderTT);
    const [loading, setLoading] = useState(false);
    const { data: dataBranch }: any = useGetBranchByIdBranchQuery(fullData?.room.branch)
    const showModal = () => {
        // if (data) {
        setIsModalOpen(true);
        // }
    };
    const [checkoutData, { isUninitialized, isSuccess, isError }] = useCheckoutTienMatMutation()
    const handleOk = async () => {
        setLoading(true);
        try {
            const response: any = await checkoutData(data); // Gửi yêu cầu mutation và chờ kết quả trả về
            console.log(response);
            router.push(response?.data.url)

        } catch (err) {
        } finally {
            // setLoading(false);
        }
        // console.log();

        // router.push(`https://sandbox.vnpayment.vn/paymentv2/VnMart/Transaction/Index.html?token=374356da97074b06ae351b4567ff5ef8`)

        // const showThankYou = {
        //     ...dataBranch?.data,
        //     ...fullData,
        //     nameRoom: fullData?.room.name,
        //     nameMovie: fullData?.movie.name,
        //     tenghe: data?.tenghe.join(", "),
        //     price: data?.price,
        // }
        // const queryString = Object.keys(showThankYou).map((key) => key + '=' + showThankYou[key]).join('&');
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {dataBranch ? <Button type="primary" htmlType="submit" onClick={showModal} className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full  text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Xác nhận
            </Button> : 'loading'}
            {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button> */}
            <Modal title="Chi tiết vé xem phim"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <button type="button" key='1' onClick={handleCancel} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Hủy
                    </button>
                    ,
                    <button key='2' onClick={handleOk} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Thanh toán
                    </button>
                    ,

                ]}
            >
                <div className="flex flex-col md:flex-row">
                    <div className="order-2 mx-auto grow px-6 py-5 md:order-1">
                        <div><ul className="flex items-center space-x-2">
                            <li className="md:text-lg"><b>{fullData?.movie.name}</b></li>
                        </ul>
                            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-4 border-t border-dashed border-gray-200 pt-4"><li className="flex items-end justify-between space-x-10">
                                <div><span className="block font-semibold text-gray-500" >THỜI GIAN</span>
                                    <div className="text-gray-800"><b>{moment(fullData?.startTime).format('LT')}  ~  {moment(fullData?.endTime).format('LT')}</b></div></div></li><li className="flex items-end justify-between space-x-10">
                                    <div><span className="block font-semibold text-gray-500" >NGÀY CHIẾU</span>
                                        <div className="text-gray-800"><b>{moment(fullData?.startTime).format('DD-MM-YYYY')}</b></div></div></li><li className="flex items-end justify-between space-x-10 col-span-2">
                                    <div><span className="block font-semibold text-gray-500" >RẠP</span>
                                        <div className="text-gray-800"><b>{dataBranch?.data.name}</b></div>
                                        <div className="text-sm text-gray-500">{dataBranch?.data.address}</div></div></li><li className="flex items-end justify-between space-x-10">
                                    <div><span className="block font-semibold text-gray-500" >PHÒNG CHIẾU</span>
                                        <div className="text-gray-800"><b>Phòng {fullData?.room.name}</b></div></div></li><li className="flex items-end justify-between space-x-10">
                                    <div>
                                    </div></li></ul><ul className="mt-4 border-t border-dashed border-gray-200 pt-4"><li className="flex items-end justify-between space-x-10 col-span-2">
                                        <div><span className="block font-semibold text-gray-500" >GHẾ</span>
                                            <div className="text-gray-800"><b>{data?.tenghe.join(", ")}</b></div></div>
                                        <div className="text-gray-800"><b>{formatPrice(data?.price)}đ</b></div></li></ul></div><ul className="mt-4 border-t border-dashed border-gray-200 pt-4"><li className="flex items-end justify-between space-x-10">
                                            <div>
                                                <div className="text-gray-800"><b>Tạm tính</b></div></div>
                                            <div className="text-gray-800"><b>{formatPrice(data?.price)}đ</b></div></li></ul>
                        <div className=" mt-2 text-xs italic leading-normal text-gray-500">Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.</div></div>
                </div>
            </Modal>

        </>
    )
}
