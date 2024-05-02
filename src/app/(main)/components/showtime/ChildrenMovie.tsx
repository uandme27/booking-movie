import moment from 'moment';
import Image from 'next/image';
import React from 'react'
import Mdatve from './Mdatve';
import { useGetBookedSeatsByIdQuery } from '@/app/redux/features/movie/cinema.service';

function Showtime(startTime: any, endTime: any, data: any) {
    const currentTime = moment();
    const startMoment = moment(startTime);
    const checkTime = startMoment.isAfter(currentTime);
    const startTimeMoment = moment(startTime).format('LT')
    const endTimeMoment = moment(endTime).format('LT')
    if (!checkTime) {
        return <button disabled key={startTimeMoment} className=" cursor-not-allowed rounded-md border border-red-400 bg-dark-100/5 px-2 py-1 text-center text-red-400  ">
            <s className="text-md font-semibold">{startTimeMoment}</s> ~ <s>{endTimeMoment}</s>
        </button>
    }

    return (
        <Mdatve startTime={startTimeMoment} endTime={endTimeMoment} seats={data.room.seats} id={data?._id}></Mdatve>

    );
}

export default function ChildrenMovie({ day, data }: any) {
    const findDay = data?.find((item: any) => (item.date == day))
    return (
        <>
            {findDay ?
                <div className="grid">
                    {Array.isArray(findDay.movies) && findDay.movies.map((item: any, index: any) => (
                        <div className=" block w-full px-4 py-4 text-left" key={index}>
                            <div className="flex">
                                <div className=" col-start-1 row-span-2 row-start-1 ">
                                    <a className=" group block w-24 ">
                                        <div className=" background-gray-100  relative overflow-hidden rounded">
                                            <div className=" flex bg-gray-200">
                                                <div className="aspect-w-7 aspect-h-10 w-full scale-100 transition-transform duration-300 group-hover:scale-105">
                                                    <Image width={100} height={100} className='w-full' src={item.image.url} alt="" priority={true} />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className=" film-show grid gap-x-2  gap-y-0 md:gap-x-4 lg:gap-x-6">
                                    <div className=" col-start-2 ">
                                        <div className=" font-semibold leading-tight text-gray-800"><a className="">{item.name}</a></div>
                                        <div className=" mt-1 text-tiny leading-tight text-gray-400">{item.cast.join(', ')}</div></div>
                                    <div className="  col-span-2 col-start-1 md:col-start-2">
                                        <div className=" mb-4">
                                            <div className=" mb-2 text-sm font-semibold ">Thời gian chiếu phim</div>
                                            <div className=" grid grid-cols-3 gap-3 md:grid-cols-3 lg:grid-cols-4 ">
                                                {item.interests.map((item: any) => (Showtime(item.startTime, item.endTime, item)))}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                :
                <div className="cinema-warning-notfound py-5 text-center"><div>
                    {/* <Image src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg" alt="Not found" className="mx-auto block" loading="lazy" width="120" height="120" /> */}
                    <Image src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/433133670_2520841364767241_267768317014625763_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEHU5y8X3vws5ZLDE3PO_eZvBUix4viuoe8FSLHi-K6hzYtSOx6gUNcs62LrtZe7vunrMKV6aAdg80ohigyVTgb&_nc_ohc=oclHoJ1b6s4Ab5Pl7hg&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfBtQ1yk1OO_2nIh5UBuJ9XdXsowMGDvOKKc-e0LJIiCVQ&oe=661986D0" alt="Not found" className="mx-auto block" loading="lazy" width="120" height="120" />
                </div><div className="mb-0 mt-3 text-lg font-semibold">Úi, Suất chiếu không tìm thấy.</div><div className="text-sm text-gray-500">Bạn hãy thử tìm ngày khác nhé</div></div>

            }

        </>
    )
}
