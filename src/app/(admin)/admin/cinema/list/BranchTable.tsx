'use client'
import _ from 'lodash';

import React, { useState } from 'react'
import { useGetRoomQuery } from '@/app/redux/features/movie/cinema.service';
import { Tabs } from 'antd';
import ShowMovieByRoom from './ShowMovieByRoom';
import MDaddInterestByRoom from './MDaddInteresrByRoom';

export default function BranchTable({ dataId }: any) {
    const { data } = useGetRoomQuery()
    const findData = data?.data.filter((item: any) => (item.branch == dataId))
    let itemRoom = _.sortBy(findData, 'name')?.map((item: any) => (
        {
            key: item._id,
            label: `Phòng ${item.name}`,
            children: <ShowMovieByRoom id={item._id} seats={item.seats}></ShowMovieByRoom>,
        }
    ))
    const [currentKey, setCurrentKey]: any = useState(itemRoom[0]?.key);
    const onChange = (key: string) => {
        setCurrentKey(key)
    };
    return (
        <div>
            <MDaddInterestByRoom idRoom={currentKey}></MDaddInterestByRoom>
            {data ?
                <Tabs tabPosition='left' defaultActiveKey="1" items={itemRoom} onChange={onChange} />

                : ''}
        </div>
    )
}
