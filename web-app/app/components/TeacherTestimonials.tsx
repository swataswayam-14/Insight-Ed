import React from 'react';

export default function TeacherTestimonials() {
    return (
        <div className="mt-8 p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <h3 className="text-3xl font-bold text-green-600">Testimonials</h3>
            <div className="mt-4 space-y-4">
                <blockquote className="text-lg italic text-gray-800 pl-4 border-l-4 border-green-300">
                    "An inspiring mentor who brings out the best in students."
                </blockquote>
                <blockquote className="text-lg italic text-gray-800 pl-4 border-l-4 border-green-300">
                    "Makes complex subjects easily understandable."
                </blockquote>
            </div>
        </div>
    );
}