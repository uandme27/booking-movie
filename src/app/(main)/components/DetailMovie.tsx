'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { fetchMovies } from '@/app/redux/features/movie/movieSlice';

export default function DetailMovie({ movie }: any) {
    const data = movie
    const containerStyle: any = {
        overflow: 'hidden',
        // backgroundImage: 'url("https://cinema.momocdn.net/img/32033864513020595-first-look-mai-1701162316.jpg")',
        backgroundSize: 'cover',
        backdropFilter: 'blur(5px)',
    };
    return (
        <div className=" bg-[url('https://cinema.momocdn.net/img/32033864513020595-first-look-mai-1701162316.jpg')] bg-cover">
            <div className="relative z-10 flex items-center justify-center py-11 text-white text-opacity-95 bg-black bg-opacity-80" >
                <div className="container max-w-screen-xl mx-auto w-full px-5  p-6">
                    <div className="flex flex-wrap items-center md:flex-nowrap md:space-x-10 lg:items-start">
                        <div className="cine__hero__poster relative mb-4 w-full md:mb-0 md:w-auto">
                            <div className="w-32 md:mx-auto md:w-64">
                                <div className="after:z-10 flex overflow-hidden border border-white/20 md:relative ">
                                    <span
                                        style={{
                                            boxSizing: 'border-box',
                                            display: 'inline-block',
                                            overflow: 'hidden',
                                            width: 'initial',
                                            height: 'initial',
                                            background: 'none',
                                            opacity: '1',
                                            border: '0',
                                            margin: '0',
                                            padding: '0',
                                            position: 'relative',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        <span
                                            style={{
                                                boxSizing: 'border-box',
                                                display: 'block',
                                                width: 'initial',
                                                height: 'initial',
                                                background: 'none',
                                                opacity: '1',
                                                border: '0',
                                                margin: '0',
                                                padding: '0',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            <Image
                                                width={1000}
                                                height={1000}
                                                style={{
                                                    display: 'block',
                                                    maxWidth: '100%',
                                                    width: 'initial',
                                                    height: 'initial',
                                                    background: 'none',
                                                    opacity: '1',
                                                    border: '0',
                                                    margin: '0',
                                                    padding: '0',
                                                }}
                                                alt={data.image?.url}
                                                aria-hidden="true"
                                                src={data.image?.url}

                                            />
                                        </span>
                                        <Image
                                            width={1000}
                                            height={1000}
                                            alt={data.image?.url}
                                            src={data.image?.url}
                                            decoding="async"
                                            data-nimg="intrinsic"
                                            style={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                                bottom: '0',
                                                right: '0',
                                                boxSizing: 'border-box',
                                                padding: '0',
                                                border: 'none',
                                                margin: 'auto',
                                                display: 'block',
                                                width: '0',
                                                height: '0',
                                                minWidth: '100%',
                                                maxWidth: '100%',
                                                minHeight: '100%',
                                                maxHeight: '100%',
                                            }}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 w-full md:w-auto">
                            <div className=" inline-flex h-5  items-center justify-center rounded-sm bg-opacity-80 px-1  text-xs font-semibold text-white text-opacity-95 cinema-rate-red" style={{ minWidth: '20px', backgroundColor: '#9b2020' }}>18+</div>
                            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                                {data.name}
                            </h1>
                            <div className="flex flex-nowrap space-x-2 overflow-x-auto overflow-y-hidden pt-2 pb-3 md:space-x-3">
                                <div className="cine__score imdb  flex shrink-0 flex-nowrap  items-center">
                                    <div>
                                        <svg
                                            id="home_img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="64"
                                            height="32"
                                            viewBox="0 0 64 32"
                                            version="1.1"
                                            className="w-11"
                                        >
                                            <g fill="#F5C518" className="">
                                                <rect
                                                    x="0"
                                                    y="0"
                                                    width="100%"
                                                    height="100%"
                                                    rx="4"
                                                    className=""
                                                ></rect>
                                            </g>
                                            <g
                                                transform="translate(8.000000, 7.000000)"
                                                fill="#000000"
                                                fillRule="nonzero"
                                                className=""
                                            >
                                                <polygon
                                                    points="0 18 5 18 5 0 0 0"
                                                    className=""
                                                ></polygon>
                                                <path
                                                    d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"
                                                    className=""
                                                ></path>
                                                <path
                                                    d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"
                                                    className=""
                                                ></path>
                                                <path
                                                    d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"
                                                    className=""
                                                ></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="px-2 text-xl font-bold">
                                        {data.duration}
                                        <span className="text-sm font-normal">/10</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white text-opacity-90">
                                Nội dung
                            </h3>
                            <div className="mt-2 text-sm leading-relaxed text-white text-opacity-70 xl:max-w-xl">
                                {data.description}
                            </div>
                            <div className=" mt-3 text-sm text-gray-700 ">
                                <div className=" mb-2 flex flex-nowrap space-x-4 md:space-x-5">
                                    <div className="">
                                        <div className=" whitespace-nowrap text-white text-opacity-50">Ngày chiếu</div>
                                        <div className=" mt-1 font-bold text-white text-opacity-90">10/02/2024</div>
                                    </div>
                                    <div className="">
                                        <div className=" whitespace-nowrap text-white text-opacity-50">Thể loại</div>
                                        <div className=" mt-1 font-bold text-white text-opacity-90">Lãng mạn, Tình cảm, Tâm lý</div>
                                    </div>
                                    <div className="">
                                        <div className=" whitespace-nowrap text-white text-opacity-50">Quốc gia</div>
                                        <div className=" mt-1 font-bold text-white text-opacity-90">Việt Nam</div>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-3 flex items-center space-x-4">
                                <div className="tracking-click-play-trailer tracking-focus flex cursor-pointer items-center space-x-1.5 py-2 text-sm hover:underline">
                                    <div className="h-6 w-6 rounded-full border-2 border-pink-600 text-white/80">
                                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                            <g fill="none" fill-rule="evenodd">
                                                <path d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z" fill="currentColor" fill-rule="nonzero">
                                                </path>
                                            </g>
                                        </svg>
                                    </div>
                                    <span>Xem trailer</span>
                                </div>
                                <a className="tracking-click-view-review tracking-focus flex items-center space-x-1.5 py-2 text-sm hover:underline" href="">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-yellow-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="text-white/85 h-4 w-4 ">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                            </path>
                                        </svg>
                                    </div>
                                    <span>Xem review</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
