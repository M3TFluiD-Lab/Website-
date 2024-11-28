import React from 'react'

const Teaching = () => {
    return (
        <main className="px-4 lg:px-8 pt-16 flex justify-start">
            <section className="py-6 lg:py-14 flex justify-center">
                <div className="mb-16 w-full">
                    <div className="container flex flex-col items-center justify-center">
                        <ul className="list-disc list-disc-dark ml-5 w-full text-justify">
                            <li>
                                <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                    ESC 321 (Thermodynamics)
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                    MCE 324 (Heat Transfer)
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                    MCE 638 (Viscous Flow)
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                    MCE 690 (Computational Fluid Dynamics)
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                    MCE 593 (Fundamental of Modeling and Simulation)
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                    MCE 493/593 (Sustainable&nbsp;Energy)
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n            /* Custom CSS for list marker color */\n            .list-disc-dark li::marker {\n                color: black;\n                /* Default color for light theme */\n            }\n\n            .dark .list-disc-dark li::marker {\n                color: white;\n                /* Color for dark theme */\n            }\n        "
                }}
            />
        </main>

    )
}

export default Teaching