import React from 'react'
import { Tabs } from 'antd';
import Chinhanh from './Chinhanh';
import { useGetCinemaQuery } from '@/app/redux/features/movie/cinema.service';
import Image from 'next/image';
import { Alert, Flex, Spin } from 'antd';
export default function Showtimes() {
    const { data } = useGetCinemaQuery()
    let itemCinema = data?.data.map((item: any) => (
        {
            branch: item,
            key: item._id,
            icon: <Image src={item.image.url} alt={item.name} width={50} height={50} />,
        }
    ))

    return (
        <div className="scroll-margin-top bg-light py-8 text-white md:py-10 lg:py-16 ">

            <div className="mx-auto w-full max-w-screen-xl  border-pink border-gray-200">
                {data ? <Tabs
                    defaultActiveKey="2"
                    items={itemCinema.map((item: any) => {
                        return {
                            ...item,
                            children: <Chinhanh cinema={item.branch} />,
                        };
                    })}
                /> : <Spin tip="Loading...">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin>}

            </div>
        </div>
    )
}
