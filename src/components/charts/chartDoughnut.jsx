import React from 'react'
import { Chart } from 'primereact/chart'

export default function DoughnutChart({ chartData }) {
  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <div className="card justify-content-center flex">
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="md:w-30rem w-full"
      />
    </div>
  )
}
