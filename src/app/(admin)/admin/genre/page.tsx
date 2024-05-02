'use client'
import React from 'react';
import { Button, Table } from 'antd';
import MDaddMovie from './MDaddGenre';
import Column from 'antd/es/table/Column';
import { useGetGenreQuery } from '@/app/redux/features/movie/genre.service';
import ButtonActtion from './ButtonActtion';
import MDaddGenre from './MDaddGenre';
import { ToastContainer } from 'react-toastify';
export default function Page() {
    const { data, isFetching } = useGetGenreQuery()

    return (
        <div className="pt-6 px-4">
            <div className=" my-4">
                <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold leading-none text-gray-900">Danh sách thể loại</h3>
                        <div className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                            {/* <MDaddMovie></MDaddMovie> */}
                            <MDaddGenre></MDaddGenre>

                        </div>
                    </div>
                    <div className="flow-root">
                        {/* {isFetching ? (
                            <div>Loading...</div>
                        ) : ( */}
                        <Table dataSource={data?.data}>
                            <Column
                                title="Thể loại"
                                dataIndex="name"
                                key="name"
                                width={'80%'}
                            />
                            <Column title="Chức Năng" dataIndex="" key="data"
                                render={(record) => (
                                    <ButtonActtion data={record} />
                                )}

                            />
                        </Table>
                        {/* )} */}
                    </div>
                </div>
                {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Acquisition Overview</h3>
                    <div className="block w-full overflow-x-auto">

                    </div>
                </div> */}
            </div>
            <ToastContainer />

        </div>
    )
}
