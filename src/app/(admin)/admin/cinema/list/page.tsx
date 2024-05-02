'use client'
import { useGetCinemaQuery } from '@/app/redux/features/movie/cinema.service'
import React from 'react'
import TableCinema from './TableCinema';
import MDaddInteresr from './MDaddInteresr';

export default function Page() {
    const { data } = useGetCinemaQuery()

    return (
        <div className="pt-6 px-4">
            <div className=" my-4">
                <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold leading-none text-gray-900">Lịch chiếu phim</h3>
                        <div className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                            <MDaddInteresr></MDaddInteresr>
                        </div>
                    </div>
                    <div className="flow-root">
                        {data ? <TableCinema cinema={data?.data}></TableCinema> : ''}

                    </div>
                </div>
                {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Acquisition Overview</h3>
                    <div className="block w-full overflow-x-auto">

                    </div>
                </div> */}
            </div>
        </div>
    )
}
