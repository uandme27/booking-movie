'use client'

import { useGetBranchByIdCinemaQuery } from '@/app/redux/features/movie/cinema.service';
import React from 'react'
import { Tabs } from 'antd';
import BranchTable from './BranchTable';
export default function Branch({ branch }: any) {
    const onChange = (key: string) => {
    };
    const { data } = useGetBranchByIdCinemaQuery(branch)
    let itemCinema = data?.data.map((item: any) => (
        {
            key: item._id,
            label: item.name,
            children: <BranchTable dataId={item._id}></BranchTable>,
        }
    ))
    return (
        <>
            {data ? <Tabs defaultActiveKey="1" items={itemCinema} onChange={onChange} /> : ''}
        </>
    )
}
