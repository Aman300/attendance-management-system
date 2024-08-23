import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ClockGraph = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const startTime = new Date(time);
  startTime.setHours(10, 0, 0, 0);
  const hoursWorked = Math.max(0, Math.min(9, (time - startTime) / (1000 * 60 * 60)));
  const percentComplete = (hoursWorked / 9) * 100;

  const chartOptions = {
    chart: {
      height: 280,
      type: 'radialBar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -180,
        endAngle: 180,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#f8f9fa',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#e9ecef',
          strokeWidth: '67%',
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#495057',
            fontSize: '17px'
          },
          value: {
            formatter: function(val) {
              return parseFloat(val / 100 * 9).toFixed(2) + " hrs";
            },
            color: '#212529',
            fontSize: '36px',
            show: true,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#4CAF50'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Work Progress'],
  };

  const series = [percentComplete];

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Work Time Tracker</h2>
      <div className="w-full h-72">
        <ReactApexChart options={chartOptions} series={series} type="radialBar" height={280} />
      </div>
      <div className="text-center mt-0 w-full">
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
          <div>
            <p className="text-sm text-gray-600">Hours Worked</p>
            <p className="text-lg font-semibold text-gray-800">{hoursWorked.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Remaining</p>
            <p className="text-lg font-semibold text-gray-800">{(9 - hoursWorked).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockGraph;