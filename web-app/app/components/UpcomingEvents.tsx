export default function UpcomingEvents(){
    return <div className="my-8 mt-10">
    <h3 className="text-lg font-semibold text-gray-200">Upcoming Events</h3>
    <div className="events-list">
        {/* Event items */}
        <div className="event-item flex items-center p-4 bg-gray-200 rounded-lg shadow-md mt-4 transform transition duration-500">
        <div className="event-date mr-4">
            <p className="text-lg font-semibold text-indigo-600">Apr 25</p>
            <p className="text-xs text-gray-500">Thursday</p>
        </div>
        <div className="event-details">
            <h4 className="text-md font-semibold hover:text-indigo-500 text-black">Data Structures Workshop</h4>
            <p className="text-sm text-gray-600">10:00 AM - 12:00 PM</p>
        </div>
        </div>

        {/* Repeat for other events */}
    </div>
</div>

}