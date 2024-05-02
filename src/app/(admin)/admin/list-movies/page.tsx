'use client'
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '@/app/redux/features/movie/movieSlice';
const { Column, ColumnGroup } = Table;
import { Movie } from '@/app/(main)/components/any';
import Image from 'next/image';
import ButtonActtion from './ButtonActtion';
import MDaddMovie from './MDaddMovie';
import { useGetMovieQuery } from '@/app/redux/features/movie/movie.service';


export default function Page() {
    const { data, isLoading, isFetching } = useGetMovieQuery()
    return (
        <div className="pt-6 px-4">
            <div className=" my-4">
                <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold leading-none text-gray-900">Danh sách phim</h3>
                        <div className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                            <MDaddMovie></MDaddMovie>
                        </div>
                    </div>
                    <div className="flow-root">
                        <Table dataSource={data?.movie}>
                            <Column
                                title="Ảnh phim"
                                key="Ảnh"
                                render={(record) => (
                                    record?.image?.url && /\.(jpg|jpeg|png|gif)$/.test(record.image.url) ? (
                                        <Image
                                            width={100}
                                            height={100}
                                            src={record.image.url}
                                            alt={record.image.name}
                                        />
                                    ) : (
                                        <span>Link ảnh không hợp lệ</span>
                                    )
                                )}
                            />
                            <Column
                                title="Tên phim"
                                dataIndex="name"
                                key="name"

                            />
                            <Column
                                title="Diễn viên"
                                dataIndex="cast" key="cast"
                                render={(cast) => (
                                    <>
                                        {cast.map((cast: any) => {

                                            return (
                                                <div key={cast} className='py-1'>
                                                    <Tag >
                                                        {cast}
                                                    </Tag>
                                                    <br />
                                                </div>
                                            );
                                        })}
                                    </>
                                )} />
                            <Column
                                title="Diễn viên"
                                dataIndex="genre" key="genre"
                                render={(genre) => (
                                    <>
                                        {genre.map((genre: any) => {

                                            return (
                                                <div key={genre.name} className='py-1'>
                                                    <Tag >
                                                        {genre.name}
                                                    </Tag>
                                                    <br />
                                                </div>
                                            );
                                        })}
                                    </>
                                )} />
                            <Column title="Thời gian" dataIndex="duration" key="duration" />
                            <Column title="Tác giả" dataIndex="director" key="director" />
                            <Column title="Chức Năng" dataIndex="" key="data"
                                render={(record) => (
                                    <ButtonActtion data={record} />
                                )}

                            />
                        </Table>
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
