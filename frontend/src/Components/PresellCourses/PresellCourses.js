import React from "react";
import SectionHeader from "./../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import "./PresellCourses.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CourseBox from "../CourseBox/CourseBox";

export default function PresellCourses() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };
  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title='دوره های در حال پیش فروش'
          desc='متن تستی برای توضیحات دوره های پیش فروش'
        />
        <Swiper
        modules={[Navigation , Pagination  , A11y]}
          spaceBetween={50}
          slidesPerView={3}
          pagination={pagination}
        >
          <SwiperSlide> <CourseBox inSlider={true} /> </SwiperSlide>
          <SwiperSlide> <CourseBox inSlider={true} /> </SwiperSlide>
          <SwiperSlide> <CourseBox inSlider={true} /> </SwiperSlide>
          <SwiperSlide> <CourseBox inSlider={true} /> </SwiperSlide>
          <SwiperSlide> <CourseBox inSlider={true} /> </SwiperSlide>
          <SwiperSlide> <CourseBox inSlider={true} /> </SwiperSlide>
          <SwiperSlide> <CourseBox inSlider={true} /> </SwiperSlide>
          <SwiperSlide> <CourseBox inSlider={true} /> </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
