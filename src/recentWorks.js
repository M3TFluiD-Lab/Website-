const recentWorks = [
    {
        img: "/images/video_1.mp4",
        type: "video"
    },
    {
        img: "/images/demo_img1.jpg",
        type: "img"
    },
    {
        img: "/images/demo_img2.jpg",
        type: "img"
    },
    {
        img: "/images/descriptionImage-1670782021710.jpg",
        type: "img"
    },
    {
        img: "/images/file-1670781812872.jpg",
        type: "img"
    },
    {
        img: "/images/file-1670798272492.jpg",
        type: "img"
    },
    {
        img: "/images/file-1670798273852.jpg",
        type: "img"
    },
    {
        img: "/images/file-1670798275461.jpg",
        type: "img"
    },
    {
        img: "/images/file-1670798275873.jpg",
        type: "img"
    },
];
const recentWorks2 = [
    {
        title: "Personal Portfolio",
        description: "Professional page for personal portfolio showcase.",
        techs: ["Tailwind", "JS", "Vite"],
        img: "/images/personal-portfolio.png"
    },
    {
        title: "Doctors Portal",
        description: "Doctors appointment booking website.",
        techs: ["React", "Node", "JS"],
        img: "/images/doctors-portal.png"
    },
    {
        title: "Digital Marketing",
        description: "Professional page for digital marketing.",
        techs: ["BS5", "CSS", "JS"],
        img: "/images/digital-marketing.png"
    },
    {
        title: "Personal Portfolio",
        description: "Professional page for personal portfolio showcase.",
        techs: ["Tailwind", "JS", "Vite"],
        img: "/images/personal-portfolio.png"
    },
    {
        title: "Doctors Portal",
        description: "Doctors appointment booking website.",
        techs: ["React", "Node", "JS"],
        img: "/images/doctors-portal.png"
    },
    {
        title: "Digital Marketing",
        description: "Professional page for digital marketing.",
        techs: ["BS5", "CSS", "JS"],
        img: "/images/digital-marketing.png"
    },
];
const parent = document.getElementById('recent-works');
const parent2 = document.getElementById('recent-works2');

const getTech = (techs) => {
    return techs.map(tech =>
        `<button type="button" className="text-gray-900 bg-gray-100 border border-gray-100  hover:bg-gray-50 font-medium rounded-md text-sm px-3.5 py-2 mr-2 mb-2 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-600 dark:hover:border-gray-600">
                ${tech}
            </button>`).join(" ");
}

const html = recentWorks.map(work =>
    ` <div className="carousel-item flex-shrink-0 w-[525px] h-[344px] px-2">
    <div className="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <div className="w-full aspect-w-16 aspect-h-9">
            ${work.type === "video" ? `
                <video className="rounded-t-lg w-full h-full object-cover" loop muted playsinline autoplay src="${work.img}"></video>
            ` : `
                <img className="rounded-t-lg w-full h-full object-cover" src="${work.img}" />
            `}
        </div>
    </div>
</div>`
);
const html2 = recentWorks2.map(work =>
    ` <div className="carousel-item flex-shrink-0 w-full md:w-1/3 px-2">
    <div className="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="lg:h-36 object-cover">
            <img className="rounded-t-lg w-full" src=${work.img} alt=${work.title} />
        </div>
        <div className="p-3 border-t border-gray-100 dark:border-gray-600">
            <h5 className="text-xl font-semibold text-gray-900 dark:text-gray-200">${work.title}</h5>
        <p className="font-light text-gray-800 dark:text-gray-400">${work.description}</p>
        <div className="my-4 flex flex-wrap">
            ${getTech(work.techs)}
        </div>
        <a href="https://github.com/nchdatta/personal-portfolio" target="_blank"
            className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center rounded-lg text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
            Read more
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
        </a>
        </div>
        </div>
    </div>`
);

parent.innerHTML = html.join(" ");
parent2.innerHTML = html2.join(" ");