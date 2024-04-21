import Image from "next/image"
export default function TestiMonials(){
    return <div className="my-8 p-6 bg-gray-200 shadow-lg rounded-lg">
    <h3 className="text-xl font-semibold text-gray-800 border-b pb-4">What Our Students Say</h3>
    <div className="testimonial-slider mt-6">
        {/* Testimonial items */}
        <div className="testimonial-item p-4 bg-gray-100 rounded-lg">
            <p className="text-md text-gray-700 italic">"The courses here have helped me improve my skills tremendously!"</p>
            <div className="flex items-center mt-6">
                <div className="testimonial-avatar">
                    <Image 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQOGYkY8Di_0o3r5GeoBdOyHGHiVnAby59io_gmBtq4BFN0KXBSSD0FKFfbaWHnwlUIks&usqp=CAU"
                        alt="Student Avatar"
                        className="w-12 h-12 rounded-full border-2 border-gray-300"
                        width={200}
                        height={300}
                        placeholder="blur"
                    />
                </div>
                <div className="ml-4">
                    <p className="text-md font-semibold text-gray-800">Jane Doe</p>
                    <p className="text-sm text-gray-600">Computer Science Student</p>
                </div>
            </div>
        </div>
        {/* Repeat for other testimonials */}
    </div>
</div>


}