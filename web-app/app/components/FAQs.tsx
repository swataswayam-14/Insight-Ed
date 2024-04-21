export default function FAQ(){
    return <div className="my-8 p-6 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md">
    <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
    <div className="accordion" id="faqAccordion">
        <div className="accordion-item bg-gray-700 border border-gray-600 rounded-md">
            <h2 className="accordion-header mb-0" id="headingOne">
                <button className="accordion-button flex items-center justify-between w-full py-4 px-6 text-lg text-left text-white bg-gray-700 border-0 rounded-md transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    How do I enroll in new courses?
                    <span className="accordion-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                <div className="accordion-body py-4 px-6 text-gray-300">
                    You can enroll in new courses by visiting the &apos;Browse Courses&apos; section and selecting the courses you&apos;re interested in.
                </div>
            </div>
        </div>
        {/* Repeat for other FAQs */}
    </div>
</div>
}