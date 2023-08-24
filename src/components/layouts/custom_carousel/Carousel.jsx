import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiChevronLeft, HiChevronRight, HiPlay } from "react-icons/hi2";


import Img from './../../ui/Img';
import MainWrapper from "../MainWrapper";
import useFetch from "../../../hooks/useFetch";



export default function Carousel({ title, endpoints, videoPlayableCard, getBgPath }) {
  const { data, loading } = useFetch(endpoints);
  const { url } = useSelector((state) => state.home);


  return (
    <>
      <MainWrapper>
        <div className="overflow-hidden relative group w-full">
          {/* CAROUSEL HEADER SECTION */}
          <header className="carousel_header">
            <h1 className="carousel_title">{title}</h1>

            {/* CAROUSEL LEFT & RIGHT MOVE CONTROLLER */}
            <div className="carousel_controller">
              <button className="icon_btn">
                <HiChevronLeft size={22} />
              </button>
              <button className="icon_btn">
                <HiChevronRight size={22} />
              </button>
            </div>
          </header>

          {/* CAROUSEL ITEMS CONTAINER */}
          <section>
            {!loading ? (
              <div className="carousel_contents">
                {data?.results?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onLoad={() =>
                        videoPlayableCard && getBgPath(item?.backdrop_path)
                      }
                      onMouseEnter={() =>
                        videoPlayableCard && getBgPath(item?.backdrop_path)
                      }
                      className={`carousel_item group/card ${
                        !!videoPlayableCard
                          ? "shadow-md w-full sm:w-1/2 md:w-1/3 relative hover:scale-95 hover:border-yellow-500"
                          : "w-2/5 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-52"
                      }`}
                      style={{
                        backgroundImage: `url(${
                          !!videoPlayableCard
                            ? url?.backdrop_w780 + item?.backdrop_path
                            : url?.poster + item?.poster_path
                        })`,
                      }}
                    >
                      <Img
                        src={
                          !!videoPlayableCard
                            ? url?.backdrop_w780 + item?.backdrop_path
                            : url?.poster + item?.poster_path
                        }
                        alt={item?.title}
                        className="invisible"
                      />

                      {videoPlayableCard && (
                        <HiPlay size={56} className="cart_playbtn" />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </section>

          {/* SCROLL BAR COVER */}
          <div
            className={`${
              videoPlayableCard ? "bg-transparent" : "bg-[#191919]"
            } absolute h-2 w-full bottom-0 left-0 transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:-z-50`}
          />
        </div>
      </MainWrapper>
    </>
  );
}