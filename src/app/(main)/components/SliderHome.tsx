import Slider from "react-slick";

const slides: any = [
  { id: 1, content: "https://cdn.galaxycine.vn/media/2024/3/7/83--phai-dep-nao-cung-co-qua-3_1709793293617.jpg" },
  { id: 2, content: "https://cdn.galaxycine.vn/media/2024/2/7/galaxy-sala-uu-dai-50-bap-nuoc-5_1707279460301.jpg" },
  { id: 3, content: "https://cdn.galaxycine.vn/media/2024/2/23/kungfu-panda-4-2048_1708659252125.jpg" },
  { id: 4, content: "https://cdn.galaxycine.vn/media/2024/3/7/83--phai-dep-nao-cung-co-qua-3_1709793293617.jpg" },
  { id: 5, content: "https://cdn.galaxycine.vn/media/2024/2/7/galaxy-sala-uu-dai-50-bap-nuoc-5_1707279460301.jpg" },
  { id: 6, content: "https://cdn.galaxycine.vn/media/2024/2/23/kungfu-panda-4-2048_1708659252125.jpg" },
]

const SliderHome = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (<>
    <Slider {...settings}>
      {slides.map((slide: any, index: number) => (
        <div key={index}>
          <img src={slide.content} alt="" />
        </div>
      ))}
    </Slider>
  </>)
}

export default SliderHome