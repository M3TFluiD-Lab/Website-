import React from 'react'
import navid from "../images/navid_goudarzi2.png"
import Mortazavian from "../images/Mortazavian-Professional-headshot.jpg"
import Maede from "../images/Maede.jpeg"
import Shivesh from "../images/Shivesh-1024x1005.jpg"
import khushbu from "../images/khushbu.jpg"
import Ashish from "../images/IMG_6107.png"

const Team = () => {
    return (
        <main className="px-4 lg:px-8 flex justify-center">
            <section className="py-6 lg:py-14 flex justify-center">
                <div className="mb-16 w-full">
                    <div className="container flex flex-col items-center justify-center">
                        <div className="bg-white text-black dark:bg-gray-900 dark:text-white p-8">
                            {/* Header */}
                            <h1 className="text-2xl font-bold mb-4">
                                M³TFluiD Lab: Dr. Navid Goudarzi
                            </h1>
                            {/* Card Container */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Card 1 */}
                                <div className="flex items-center space-x-4 bg-gray-100 text-black dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow-lg">
                                    <img
                                        src={navid}
                                        alt="Ashish Alfred"
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold">Dr. Navid Goudarzi</h2>
                                        <p>Assistant Professor, Mechanical Engineering Department</p>
                                        <p>PI, M3TFluiD Lab</p>
                                        <p>Co-Director, IERS Center</p>
                                        <a
                                            href="mailto:n.goudarzi@csuohio.edu"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            n.goudarzi@csuohio.edu
                                        </a>
                                    </div>
                                </div>
                                {/* Card 2 */}
                                <div className="flex items-center space-x-4 bg-gray-100 text-black dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow-lg">
                                    <img
                                        src={Mortazavian}
                                        alt="Javad Mortazavian"
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold">Javad Mortazavian</h2>
                                        <p>Ph.D. Student</p>
                                        <p>Mechanical Engineering</p>
                                        <p>
                                            Research: Computational Wind Engineering; Applied ML in Fluid
                                            Mechanics
                                        </p>
                                        <a
                                            href="mailto:s.mortazaviannajafabadi@vikes.csuohio.edu"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            s.mortazaviannajafabadi@vikes.csuohio.edu
                                        </a>
                                    </div>
                                </div>
                                {/* Card 3 */}
                                <div className="flex items-center space-x-4 bg-gray-100 text-black dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow-lg">
                                    <img
                                        src={Maede}
                                        alt="Maede Najian"
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold">Maede Najian</h2>
                                        <p>Ph.D. Student</p>
                                        <p>Mechanical Engineering</p>
                                        <p>
                                            Research: Urban wind flow characterization; built-up areas;
                                            urban building energy modeling
                                        </p>
                                        <a
                                            href="mailto:m.najian@vikes.csuohio.edu "
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            m.najian@vikes.csuohio.edu
                                        </a>
                                    </div>
                                </div>
                                {/* Card 4 */}
                                <div className="flex items-center space-x-4 bg-gray-100 text-black dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow-lg">
                                    <img
                                        src={Shivesh}
                                        alt="Shivesh Narayan Sharma"
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold">Shivesh Narayan Sharma</h2>
                                        <p>Ph.D. Student</p>
                                        <p>Mechanical Engineering</p>
                                        <p>
                                            Research: Urban micro climate; urban air mobility; reduced
                                            order modeling (ROM)
                                        </p>
                                        <a
                                            href="mailto:s.n.sharma@vikes.csuohio.edu"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            s.n.sharma@vikes.csuohio.edu
                                        </a>
                                    </div>
                                </div>
                                {/* Card 5 */}
                                <div className="flex items-center space-x-4 bg-gray-100 text-black dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow-lg">
                                    <img
                                        src={khushbu}
                                        alt="Khushbuben Jigneshkumar Baro"
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            Khushbuben Jigneshkumar Baro
                                        </h2>
                                        <p>Master’s Student</p>
                                        <p>Computer Science Engineering</p>
                                        <p>Research: AR/VR modeling (ROM)</p>
                                        <a
                                            href="mailto:s.mortazaviannajafabadi@vikes.csuohio.edu"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            k.barot6@vikes.csuohio.edu
                                        </a>
                                    </div>
                                </div>
                                {/* Card 6 */}
                                <div className="flex items-center space-x-4 bg-gray-100 text-black dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow-lg">
                                    <img
                                        src={Ashish}
                                        alt="Ashish Alfred"
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold">Ashish Alfred</h2>
                                        <p>Alimni student</p>
                                        <p>Mechanical Engineering</p>
                                        <p>Research: Computational fluid dynamics (CFD)</p>
                                        <a
                                            href="mailto:a.alfred49@vikes.csuohio.edu "
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            a.alfred49@vikes.csuohio.edu
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )
}

export default Team