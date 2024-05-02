import React from "react";
import { Modal } from "antd";
import { Image } from "antd";

interface MovieModalProps {
  open: boolean;
  onClose: () => void;
  movie: any;
}

const MovieModal: React.FC<MovieModalProps> = ({ open, onClose, movie }) => {
  return (
    <Modal
      open={open}
      onOk={onClose}
      onCancel={onClose}
      className=" max-w-2xl max-h-[600px] shadow mx-auto mt-[120px] rounded z-30"
      width={1000}
      footer={null}
    >
      <iframe
        className="w-full"
        width="560"
        height="315"
        src={movie.trailer}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className="p-2 flex">
        <div className="w-[20%] h-[200px]">
          <Image
            src={movie.image.url}
            alt={movie.name}
            width={110}
            height={180}
            className="rounded-lg mb-2 mr-2 "
          />
        </div>

        <div className="ml-3 w-[80%]">
          <h3 className="text-lg font-medium mb-2">{movie.name}</h3>
          <p className="text-sm">Thể loại: {movie.name}</p>
          <div className="flex text-sm py-1">
            Đánh giá: {movie.duration}
          </div>
          <p className="opacity-70 text-sm">Mô tả: {movie.description}</p>
          <div className="my-4">
            <button className="bg-sky-700 text-white px-5 py-1 rounded-lg cursor-pointer">
              Đặt vé
            </button>
            <button
              className="bg-orange-400 ml-3 text-white px-5 py-1 rounded-lg cursor-pointer"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModal;
