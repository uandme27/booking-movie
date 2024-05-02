import React from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useGetInterestQuery } from '@/app/redux/features/movie/cinema.service';
import ChildrenMovie from './showtime/ChildrenMovie';
const { TabPane } = Tabs;
const onChange = (key: string) => {
    // console.log(key);
};
const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const todayIndex = new Date().getDay();
const today = new Date();
const reorderedDaysOfWeek = [
    ...daysOfWeek.slice(todayIndex),
    ...daysOfWeek.slice(0, todayIndex),
];

export default function AllMovie({ cinema, branch }: any) {
    const { data } = useGetInterestQuery()
    const findBranch = data?.data.find((item: any) => (item.branch === branch._id))
    const items: TabsProps['items'] = reorderedDaysOfWeek.map((dayName, index) => {
        const dateForDay = new Date(today);
        dateForDay.setDate(today.getDate() + index);
        const dayOfMonth = (dateForDay.getDate() < 10 ? '0' : '') + dateForDay.getDate().toString();
        const monthOfYear = (dateForDay.getMonth() + 1 < 10 ? '0' : '') + (dateForDay.getMonth() + 1).toString();
        const yearOfDate = dateForDay.getFullYear();

        return {
            key: `${index + 1}`,
            label: (
                <div className=" w-16 cursor-pointer overflow-hidden rounded border bg-white py-0 text-center transition-all border-gray-300 hover:border-gray-400 ">
                    <div className=" mx-auto justify-center py-1 text-lg font-semibold bg-gray-100 ">{dayOfMonth}</div>
                    {/* <div className=" text-nowrap flex h-6 items-center justify-center text-xs text-gray-400 ">{index === 0 ? 'Hôm nay' : `${dayName} ${dayOfMonth}/${monthOfYear}/${yearOfDate}`}</div> */}
                    <div className=" text-nowrap flex h-6 items-center justify-center text-xs text-gray-400 ">{index === 0 ? 'Hôm nay' : dayName}</div>
                </div>
            ),
            // children: `Nội dung của ${dayName} data: ${dayName} ${dayOfMonth}-${monthOfYear}-${yearOfDate} `,
            children: <ChildrenMovie day={`${dayOfMonth}-${monthOfYear}-${yearOfDate}`} data={findBranch?.dates}></ChildrenMovie>,
        };
    });
    return (
        <div>
            <div className=" flex h-[62px] items-center bg-gray-50 px-4 pb-2.5 pt-2.5 ">
                <div className="rap-detail flex w-full flex-nowrap items-center">
                    <div className="hidden flex-none md:block">
                        <div className="flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded border border-gray-200 bg-white ">
                            <a className="flex" href="/cinema/rap/cgv/cgv-pandora-city-49">
                                <span >
                                    <img src={cinema.image.url} alt="" />
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="min-w-0 flex-1 md:pl-3">
                        <div className="mb-0 text-md font-semibold leading-tight text-gray-800">
                            <a className="text-gray-800 hover:text-pink-500 " href="/cinema/rap/cgv/cgv-pandora-city-49">Lịch chiếu phim {branch.name}</a>
                        </div>
                        <div className="flex flex-nowrap items-center text-tiny text-gray-500">
                            <div className="truncate">{branch.address}</div><div className="pl-2 false">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange}>
                {items?.map(item => (
                    <TabPane tab={item.label} key={item.key}>
                        {item.children}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    )
}
