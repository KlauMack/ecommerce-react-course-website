import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";

import productImage from "../assets/bean.webp";
import { useProducts } from "../hooks/useProducts";

export default function ProductCarousel() {
  const { data, error, isLoading } = useProducts();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="carousel-section">
      {/* HEADER */}
      <div className="carousel-header">
        <h2 className="carousel-title">NEW ARRIVALS</h2>
        <div className="carousel-nav">
          <button
            ref={prevRef}
            disabled={isBeginning}
            className={`carousel-btn ${isBeginning ? "disabled" : ""}`}
          >
            <IoIosArrowBack size={30} />
          </button>
          <button
            ref={nextRef}
            disabled={isEnd}
            className={`carousel-btn ${isEnd ? "disabled" : ""}`}
          >
            <IoIosArrowForward size={30} />
          </button>
        </div>
      </div>

      <div className="carousel-container">
        <Swiper
          modules={[Navigation, FreeMode]}
          slidesPerView={1.2}
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
          breakpoints={{
            768: {
              slidesPerView: 2.5,
              slidesOffsetBefore: 40,
            },
            1024: {
              slidesPerView: 3.5,
              slidesOffsetBefore: 0,
            },
          }}
          spaceBetween={10}
          freeMode={true}
          grabCursor={true}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {data.map((product) => (
            <SwiperSlide>
              <div className="carousel-card" key={product.id}>
                <div className="card-header">
                  <span className="product-badge">NEW FLAVOUR</span>
                </div>
                <div className="image-wrapper">
                  <img src={productImage} alt="Product Image" />
                </div>
                <div className="card-footer">
                  <div className="info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                </div>
                <div className="price">${product.price}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
