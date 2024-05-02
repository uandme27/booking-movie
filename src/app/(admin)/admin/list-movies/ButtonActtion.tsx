import React, { useState } from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import DetailMovie from '@/app/(main)/components/DetailMovie';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { fetchDeleteMovies } from '@/app/redux/features/movie/movieSlice';
import { useDeleteMovieMutation } from '@/app/redux/features/movie/movie.service';
import { ToastContainer, toast } from 'react-toastify';
import MDeditMovie from './MDeditMovie';

export default function ButtonActtion({ data }: any) {
    const [deleteMovie, { isLoading, isError }] = useDeleteMovieMutation();
    const notify = (string: string) => toast(string);
    const { confirm } = Modal;
    const showDeleteConfirm = () => {
        confirm({
            title: `Bạn chắc chắn muốn xóa phim ${data.name} ?`,
            icon: <ExclamationCircleFilled />,
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                await deleteMovie(data._id)
                notify(` Xóa thành công ${data.name} `)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    return (
        <div >
            <MDeditMovie datamovie={data}></MDeditMovie>

            <Button className='mx-2' danger onClick={showDeleteConfirm} >
                Delete
            </Button>
        </div>
    )
}
