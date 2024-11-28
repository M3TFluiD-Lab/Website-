import React from 'react'

const Services = () => {
    return (<main className="px-4 lg:px-8 pt-16 flex justify-start">
        <section className="py-6 lg:py-14 flex justify-center">
            <div className="mb-16 w-full">
                <div className="container flex flex-col items-center justify-center">
                    <div className="flex flex-col space-y-3 text-justify w-full">
                        <ul className="list-disc list-disc-dark ml-5 w-full text-justify">
                            <li>
                                <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                    EXCOM Member - American Society of Mechanical Engineers (ASME)
                                    Power Divis
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                    Associate Editor - Energy for Sustainable Development
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                    Faculty Advisor - CSU ASME Student Chapter
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                    Faculty Mentor - CSU&nbsp;Senior&nbsp;Design
                                </p>
                            </li>
                        </ul>
                    </div>
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

export default Services