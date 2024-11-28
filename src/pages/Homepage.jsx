import React from 'react'
import video_1 from "../images/video_1.mp4"
import demo_img1 from "../images/demo_img1.jpg"
import demo_img2 from "../images/demo_img2.jpg"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Homepage = () => {
    const recentWorks = [
        {
            img: video_1,
            type: "video"
        },
        {
            img: demo_img1,
            type: "img"
        },
        {
            img: demo_img2,
            type: "img"
        }
    ];

    const settings = {
        infinite: true,
        slidesToShow: 3, // Show 3 items on larger screens
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2, // Show 2 items on medium screens
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1, // Show 1 item on small screens
                }
            }
        ]

    }
    return (
        <>
            <main className="px-4 lg:px-8 pt-16">
                <div
                    id="recent-works-1"
                    className="your-class grid grid-cols-1  gap-4 lg:gap-3"
                    style={{ width: "100%" }}
                >
                    <Slider {...settings}>
                        {recentWorks.map(work =>
                            <div class="carousel-item flex-shrink-0 w-[525px] h-[344px] px-2">
                                <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                                    <div class="w-full aspect-w-16 aspect-h-9">
                                        {work.type === "video" ?
                                            <video class="rounded-t-lg w-full h-full object-cover" autoPlay loop muted playsInline src={work.img}></video>
                                            :
                                            <img class="rounded-t-lg w-full h-full object-cover" src={work.img} />
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </Slider>
                    {/* <div className="your-carousel flex" /> */}
                    {/* Recent works here  */}
                </div>
                <section className="flex justify-center items-center">
                    <div className="container flex flex-col items-center text-center">
                        {/* Main content */}
                        <div>
                            {/* Career Objective */}
                            <div className="objective mb-16">
                                <div className="flex flex-col w-full">
                                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 w-full mb-6 text-justify">
                                        M3TFluiD lab
                                    </h1>
                                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 w-full mb-6 text-justify">
                                        M3TFluiD lab is dedicated to exploring the complex and
                                        multidisciplinary nature of climate adaptation and environmental
                                        mitigation strategies (CAEMS) in the built environment using
                                        fundamental fluid dynamics, advanced data-driven models, and
                                        multi-fidelity computational techniques.
                                    </h1>
                                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 w-full text-justify">
                                        The M3TFluiD lab outcomes have a broad range of applications in
                                        building energy modeling, advanced air mobility, smart city
                                        planning, and renewable energy solutions. These outcomes also
                                        support empowering local communities with the required tools and
                                        knowledge to use and support CAEMS.
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Homepage