import React from "react";

import Header from "../../components/header/Header";
import "./home.scss";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import Shop from '../../components/shop/Shop'

const IMAGES = [
  "https://res.cloudinary.com/nghia285diem/image/upload/v1655100632/images_frontend/hero-1_bf7gkc.jpg",
  "https://res.cloudinary.com/nghia285diem/image/upload/v1655100635/images_frontend/hero-2_sns3xy.jpg",
];

const Home = () => {
  SwiperCore.use([Autoplay]);

  return (
    <>
    <Shop />
      {/* <Header />
      <div className="hero_slide">
        <Swiper
          modules={[Autoplay]}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          // autoplay={{ delay: 5000 }}
        >
          {IMAGES.map((item, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <HeroSlideItem
                  item={item}
                  className={`${isActive ? "active" : ""}`}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="grid wide">
        <div className="row sm-gutter count_down_wrapper">
          <div className="col l-3">
            <h2 className="categories_name">
              Clothings Hot <br />
              <span> Shoe Collection</span> <br /> Accessories
            </h2>
          </div>
          <div className="col l-4">
            <div className="categories">
              <img
                style={{ width: "100%" }}
                src="https://res.cloudinary.com/nghia285diem/image/upload/v1655102891/images_frontend/product-sale_ncvczz.png"
                alt="sale"
              />
              <div className="hot_sale">
                <span>Giảm giá</span>
                <h5>$29.99</h5>
              </div>
            </div>
          </div>
          <div className="col l-5">
            <div className="count_down">
              <span>Deal Of The Week</span>
              <h2>Multi-pocket Chest Bag Black</h2>
              <div className="count_down_timer">
                <Countdown date={Date.now() + 86400000} renderer={renderer} />
              </div>
              <Link to="/shop" className="btn btn-primary redirect__shop">
                Shop Now <i className="fa-solid fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return "ok";
  } else {
    return (
      <span className="timer_counter">
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

const HeroSlideItem = (props) => {
  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${props.item})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__register">
          <h6>Summer Collection</h6>
          <h2>Fall - Winter Collections 2030</h2>
          <p>
            A specialist label creating luxury essentials. Ethically crafted
            with an unwavering commitment to exceptional quality.
          </p>
          <Link to="/shop" className="btn btn-primary redirect__shop">
            Shop Now <i className="fa-solid fa-arrow-right-long"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
