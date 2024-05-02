'use client'
import React from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AllMovie from '../AllMovie';


export default function Chinhanh({ cinema }: any) {
    let branch = cinema.branches.map((item: any) => ({
        key: item._id,
        label: <div className=" relative block">
            <div className="z-1 absolute inset-0 bg-transparent">
            </div>
            <div className="rap-detail flex flex-nowrap items-center ">
                <div className="flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded border border-gray-200 bg-white ">
                    <span>
                        <img src={cinema.image.url} alt="" />
                    </span>
                </div>
                <div className="mb-0 min-w-0 flex-1 pl-3 text-md leading-tight text-gray-800">
                    <span>{item.name}</span></div><div className="hidden flex-none self-center pl-2 md:block md:pl-5 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                        </path>
                    </svg>
                </div>
            </div>
        </div>,
        children: <AllMovie branch={item} cinema={cinema} ></AllMovie>,
    }))
    const onChange = () => {
    };

    return (
        <Tabs
            tabPosition='left'
            defaultActiveKey="1"
            items={branch}
            onChange={onChange} />
    )
}
