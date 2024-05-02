import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import MovieModal from '../components/MovieModal';
import { Select, Space } from 'antd';
import { useGetGenreQuery } from '@/app/redux/features/movie/genre.service';
import { Pagination } from 'antd';
export default function FindMovie({ movies }: any) {
    const [currentPage, setCurrentPage] = useState(1);
    const [findGenre, setFindGenre]: any = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { data: genre } = useGetGenreQuery()
    if (findGenre != null) {
        movies = movies.filter((item: any) => (
            item.genre.some((genreItem: any) => genreItem._id === findGenre)
        ));
    }
    if (searchTerm !== '') {
        movies = movies.filter((movie: any) =>
            movie.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        );
    }
    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1)
    };
    const handleChange = (value: string) => {
        setFindGenre(value)
    };
    let findGenres = genre?.data.map((item: any) => ({ value: item._id, label: item.name }))
    if (findGenres) {
        findGenres = [{ value: null, label: 'Tất cả loại' }].concat(findGenres);
    }
    const handleMovieClick = (movie: any) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, movies.length - 1);
    const currentItems = movies.slice(startIndex, endIndex + 1);
    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };
    return (
        <>
            <section className="relative max-w-screen-xl mx-auto px-4" >
                <div className="mb-5 items-center md:mb-5 lg:flex">
                    <div className="flex-1 py-2"><h2 className="flex-1 text-center text-2xl font-bold  lg:text-left lg:text-2xl">Tìm phim chiếu rạp</h2></div>

                    <div className="-mx-5 shrink-0 py-0 md:mx-0 md:py-2">
                        <div className="flex w-full flex-wrap items-center justify-center md:pl-0 ">
                            <Select defaultValue="Tất cả loại phim"
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={findGenres ? findGenres : ''} />


                            <div className="relative p-1 md:w-[190px] md:p-2">
                                <input type="text" placeholder="Tìm theo tên phim ..." className="block w-full items-center justify-center rounded border border-gray-300 bg-white px-2 py-1.5 text-sm md:px-3" onChange={handleSearch} /><span className="absolute right-3 top-3 border-none opacity-50 outline-none md:right-4 md:top-4" aria-label="Search"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative min-h-[400px]">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 ">
                        {currentItems.map((movie: any, index: any) => (
                            <div key={index}>
                                <div className=" group relative block cursor-pointer">


                                    <div className=" background-gray-100 border-blend relative  overflow-hidden rounded">
                                        <Link className="" href="">
                                            <div className=" overlay absolute inset-0  bg-transparent px-2 py-2 ">
                                                <div className=" flex flex-row flex-nowrap space-x-2 ">
                                                    <div className=" inline-flex h-5  items-center justify-center rounded-sm bg-opacity-80 px-1  text-xs font-semibold text-white text-opacity-95 cinema-rate-yellow">13+</div>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="  flex  bg-gray-200">
                                            <div className="aspect-w-7 aspect-h-10 w-full scale-100 transition-transform duration-300 group-hover:scale-105"><Image width={1000} height={1000} src={movie.image?.url} alt={movie.image?.url} className="h-full w-full object-cover object-center" loading="lazy" /></div>
                                        </div>
                                    </div>
                                    <div onClick={() => handleMovieClick(movie)} className="  absolute left-1/2 top-1/2  h-10 w-10 -translate-x-1/2  -translate-y-1/2 cursor-pointer select-auto transition-transform group-hover:scale-110 md:h-10 md:w-10 ">
                                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className=""><g fill="none" fill-rule="evenodd" className=""><circle stroke="#FFF" stroke-width="2" fill-opacity=".24" fill="#000" cx="24" cy="24" r="23" className=""></circle><path d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z" fill="#FFF" fill-rule="nonzero" className=""></path></g>
                                        </svg>
                                    </div>
                                </div>
                                <div className=" mt-2">
                                    <Link href={`/detailMovie/${movie._id}`}>
                                        <div className="    truncate font-semibold leading-tight sm:text-md text-gray-800 group-hover:text-pink-500">{movie.name}</div>

                                        <div className=" mt-1 truncate text-tiny leading-tight text-gray-400 group-hover:text-pink-400">Viễn Tưởng, Lãng Mạn</div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {movies.length == 0 ? 'không tìm thấy phim' : ''}
                    </div>
                </div>

                <div className="mt-10 text-center ">
                    <Pagination
                        current={currentPage}
                        total={movies.length}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        itemRender={(current, type, originalElement) => {
                            if (type === 'prev') {
                                return (
                                    <li key={type} className="rc-pagination-prev rc-pagination-disabled">
                                        <button className="pointer-events-none flex h-8 w-8 select-none items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                            </svg>
                                        </button>
                                    </li>
                                );
                            }
                            if (type === 'next') {
                                return (
                                    <li key={type} className="rc-pagination-next rc-pagination-disabled" aria-disabled="true">
                                        <button className="pointer-events-none flex h-8 w-8 select-none items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                    </li>
                                );
                            }
                            return originalElement;
                        }}
                    />
                </div>

            </section>
            {showModal && selectedMovie && (
                <MovieModal
                    isOpen={showModal}
                    movie={selectedMovie}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    )
}
