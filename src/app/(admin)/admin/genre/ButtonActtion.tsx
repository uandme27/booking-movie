import React, { useState } from 'react';
import { Button, Input, Modal, Typography, Form, type FormProps } from 'antd';
import { useDeleteGenreMutation } from '@/app/redux/features/movie/genre.service';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Spin } from 'antd';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MDeditGenre from './MDeditGenre';
export default function ButtonActtion(genre: any) {

    const notify = (string: string) => toast(string);
    const [data, { isLoading }] = useDeleteGenreMutation()
    const { confirm } = Modal;
    const showDeleteConfirm = () => {
        confirm({
            title: `Bạn chắc chắn muốn xóa thể loại ${genre.data.name} ?`,
            icon: <ExclamationCircleFilled />,
            okText: "Xác nhận",
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                console.log(genre.data._id);
                await data(genre.data._id)
                notify(` Xóa thành công ${genre.data.name} `)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    return (
        <>

            <MDeditGenre dataId={genre.data}></MDeditGenre>


            <Button type="primary" danger className=' mx-2' onClick={showDeleteConfirm} >
                {isLoading ? <Spin /> : "Xóa"}
            </Button>
            {/* <ToastContainer /> */}
        </>
    )
}
