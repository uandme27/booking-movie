
'use client'
import { useGetInterestByIdRoomQuery } from '@/app/redux/features/movie/cinema.service';
import React from 'react'
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import _ from 'lodash';
import Mdatve from './Mdatve';
export default function ShowMovieByRoom({ id, seats }: any) {
    const { data } = useGetInterestByIdRoomQuery()
    let findData = data?.data.filter((item: any) => (item.room == id))
    findData = _.sortBy(findData, 'startTime').reverse()?.map((item: any) => (
        {
            ...item,
            name: item.movie.name,
            image: item.movie.image.url,
            key: item._id,
            time: `${moment(item.startTime).format('LT')} ~ ${moment(item.endTime).format('LT')}`,
            day: moment(item.startTime).format('DD-MM-YYYY')
        }))
    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            // render: (item: any) => <Mdatve seats={seats}></Mdatve>,
            render: (item: any) => <Image width={30} height={30} src={item} alt={item}></Image>,
        },
        {
            title: 'Tên phim',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Ngày chiếu',
            dataIndex: 'day',
            key: 'day',
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Ghế đã đặt',
            dataIndex: 'movie',
            key: 'movie',
            render: (_: any, record: any) => <Mdatve seats={seats} data={record}></Mdatve>,

        },
        {
            title: 'Trạng thái',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (startTime: any, record: any) => {
                const currentTime = moment();
                const startTimeMoment = moment(record.startTime);
                const endTimeMoment = moment(record.endTime);
                if (currentTime.isBefore(startTimeMoment)) {
                    return <button style={{ color: 'green' }}>Chưa bắt đầu</button>;
                } else if (currentTime.isAfter(endTimeMoment)) {
                    return <button style={{ color: 'red' }}>Đã kết thúc</button>;
                } else {
                    return <button style={{ color: 'blue' }}>Đang diễn ra</button>;
                }
            },
            filters: [
                { text: 'Chưa bắt đầu', value: '1' },
                { text: 'Đang diễn ra', value: '2' },
                { text: 'Đã kết thúc', value: '3' },
            ],
            onFilter: (value: any, record: any) => {
                const currentTime = moment();
                const startTimeMoment = moment(record.startTime);
                const endTimeMoment = moment(record.endTime);

                if (value === '1') {
                    return currentTime.isBefore(startTimeMoment);
                } else if (value === '2') {
                    return currentTime.isBetween(startTimeMoment, endTimeMoment, null);
                } else if (value === '3') {
                    return currentTime.isAfter(endTimeMoment);
                }

                return false; // Nếu không khớp với bất kỳ giá trị nào, trả về false
            },
            // onFilter: (value: string, record: any) => record.address.indexOf(value) === 0,
        },
    ];
    const onChange: TableProps['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div>
            {data ? <Table columns={columns} dataSource={findData} onChange={onChange} /> : ''}
        </div>
    )
}
