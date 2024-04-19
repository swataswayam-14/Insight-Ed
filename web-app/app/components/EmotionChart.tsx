const data = { "prediction": [ [ [ [ 0.0 ], [ "happy" ], [ "N/A" ] ], [ [ 13.0 ], [ "happy" ], [ "N/A" ] ], [ [ 13.0 ], [ "N/A" ], [ "Yes" ] ], [ [ 13.0 ], [ "fear" ], [ "N/A" ] ], [ [ 26.0 ], [ "happy" ], [ "N/A" ] ], [ [ 39.0 ], [ "N/A" ], [ "Yes" ] ], [ [ 52.0 ], [ "fear" ], [ "N/A" ] ], [ [ 65.0 ], [ "happy" ], [ "N/A" ] ], [ [ 78.0 ], [ "fear" ], [ "N/A" ] ], [ [ 91.0 ], [ "disgust" ], [ "N/A" ] ], [ [ 104.0 ], [ "happy" ], [ "N/A" ] ], [ [ 117.0 ], [ "N/A" ], [ "Yes" ] ], [ [ 130.0 ], [ "fear" ], [ "N/A" ] ] ] ], "status": "success" }

const EmotionChart = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Student Emotion Chart</h2>
        <div className="w-full overflow-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emotion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attention</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.prediction.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{item[0][0]} mins</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item[1][0]}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item[2][0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default EmotionChart;
