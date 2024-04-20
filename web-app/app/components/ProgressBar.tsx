export default function ProgressBar(){
    return <div className="my-4">
    <h3 className="text-lg font-semibold text-white">Course Progress</h3>
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
    </div>
</div>

}