import React from 'react'

import { Tabs } from 'antd';
import Image from 'next/image';
import Branch from './Branch';


export default function TableCinema({ cinema }: any) {
    let itemCinema = cinema.map((item: any) => (
        {
            key: item._id,
            icon: <Image src={item.image.url} alt={item.name} width={40} height={40} />,
            children: <Branch branch={item._id}></Branch>,
        }
    ))
    const onChange = (key: string) => {
    };


    return (
        <>
            <Tabs tabPosition='left' defaultActiveKey="1" items={itemCinema} onChange={onChange} />
        </>
    )
}
