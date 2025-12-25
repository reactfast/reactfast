import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'

export default function LineChart({ chartData }) {
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    // Define your hex colors directly
    const textColor = '#333333' // Replace with your brand color
    const textColorSecondary = '#666666' // Replace with your brand secondary color
    const surfaceBorder = '#cccccc' // Replace with your brand border color

    // Safely calculate the maximum value
    const maxDataValue = chartData?.datasets?.length
      ? Math.max(...chartData.datasets.flatMap((dataset) => dataset.data))
      : 0 // Default value if datasets are undefined or empty

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
            // Ensuring whole numbers only on the y-axis
            callback: (value) => (Math.floor(value) === value ? value : null),
            stepSize: 1, // Step size to ensure integer increments
          },
          grid: {
            color: surfaceBorder,
          },
          // Adding padding to the y-axis by increasing the max value
          suggestedMax: maxDataValue + 3,
        },
      },
    }

    setChartOptions(options)
  }, [chartData])

  return (
    <div className="card">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  )
}
