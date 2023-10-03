import React from "react";
import SectionHeader from "./../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import "./PopularCourses.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CourseBox from "../CourseBox/CourseBox";
export default function PopularCourses() {
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
          title="محبوب ترین دوره ها"
          desc="دوره های محبوب بر اساس امتیاز دانشجوها"
        />
        <Swiper
          modules={[Navigation, Pagination, A11y]}
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
