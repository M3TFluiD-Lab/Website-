import React from 'react'

const Publications = () => {
    return (
        <main className="px-4 lg:px-8 pt-16 flex justify-start">
            <section className="py-6 lg:py-14 flex justify-center">
                <div className="mb-16 w-full">
                    <div className="container flex flex-col items-center justify-center">
                        <style
                            dangerouslySetInnerHTML={{
                                __html:
                                    "\n                        /* Custom CSS for list marker color */\n                        .list-disc-dark li::marker {\n                            color: black;\n                            /* Default color for light theme */\n                        }\n\n                        .dark .list-disc-dark li::marker {\n                            color: white;\n                            /* Color for dark theme */\n                        }\n\n                        /* Custom CSS to justify text */\n                        .text-justify {\n                            text-align: justify;\n                        }\n                    "
                            }}
                        />
                        <div className="flex flex-col space-y-3 text-justify w-full">
                            <ul className="list-disc list-disc-dark ml-5 w-full text-justify">
                                <li>
                                    <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                        Sharma, S.N. and Goudarzi, N., 2023, August. Urban airflow
                                        analysis using reduced-order modeling. In ASME Power Conference
                                        (Vol. 87172, p. V001T05A001). American Society of Mechanical
                                        Engineers.
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                        Mortazavian, J., Sharma, S. and Goudarzi, N., 2024. Urban Wind
                                        Energy Assessment Near High-Rise Buildings within Different
                                        Urban Morphology: Insights from CFD and POD. In ASTFE Digital
                                        Library. Begel House Inc.{" "}
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                        Mortazavian, J. and Goudarzi, N., 2024, July. Techno-Economic
                                        Assessment of Urban Wind Energy Near Various Common Building
                                        Configurations. In Fluids Engineering Division Summer Meeting
                                        (Vol. 88131, p. V002T05A029). American Society of Mechanical
                                        Engineers.
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                        Mortazavian, J. and Goudarzi, N., 2024, September.
                                        Multi-Fidelity Machine Learning Analysis of Wind Patterns Around
                                        High-Rise Buildings. In ASME Power Conference (Vol. 88186, p.
                                        V001T06A008). American Society of Mechanical Engineers.
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                        Najian, M., &amp; Goudarzi, N. CFD Analysis for a Wind Tunnel
                                        Experiment for Investigating the Performance of Turbulence
                                        Models. In ASCE Inspire 2023 (pp. 895-904).
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                        Najian, M., Sharma, S., &amp; Goudarzi, N. (2024, September).
                                        Effect of Non-Isothermal Conditions on Wind Patterns Near
                                        Isolated High-Rise Buildings. In ASME Power Conference (Vol.
                                        88186, p. V001T06A009). American Society of Mechanical
                                        Engineers.
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                        Sharma, S., Najian, M., &amp; Goudarzi, N. (2024, July). Towards
                                        Improving High Spatiotemporal Weather Forecast Accuracy With
                                        Data-Driven Modeling. In Energy Sustainability (Vol. 87899, p.
                                        V001T01A012). American Society of Mechanical Engineers.
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                        Najian, M., &amp; Goudarzi, N. (2023, August). Evaluating
                                        critical weather parameters using machine learning models. In
                                        ASME Power Conference (Vol. 87172, p. V001T04A006). American
                                        Society of Mechanical Engineers.
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-800 dark:text-gray-400 text-justify mt-3">
                                        Najian, M., &amp; Goudarzi, N. (2024, July). Sustainable
                                        Building Energy Modeling: the Synergistic Interplay of Urban
                                        Heat Island, Heat Waves, and Climate Zones. In Fluids
                                        Engineering Division Summer Meeting (Vol. 88124, p.
                                        V001T01A027). American Society of Mechanical Engineers.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )
}

export default Publications