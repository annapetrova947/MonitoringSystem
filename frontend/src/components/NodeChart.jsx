import React from "react";
import { CurrentNodeMetrics } from "../contexts/Context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export function Chart() {
  const metrics = React.useContext(CurrentNodeMetrics);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    scales: {
      y: {
        max: 100,
        min: 0,
        beginAtZero: true,
      },
    },
  };

  if (metrics !== undefined) {
    const labels = [];
    const cpu = [];
    const ram = [];
    const disk = [];
    for (const met of metrics) {
      labels.push(met.datetime);
      cpu.push(Number(met.cpu_utilization));
      ram.push(Number(met.memory_utilization));
      disk.push(Number(met.disk_utilization));
    }

    const data = {
      labels,
      datasets: [
        {
          label: "CPU",
          data: cpu,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "RAM",
          data: ram,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "DISK",
          data: disk,
          borderColor: "rgb(0, 128, 0)",
          backgroundColor: "rgba(0, 128, 0, 0.5)",
        },
      ],
    };
    return <Line options={options} data={data} height={"250px"} />;
  } else {
    return (
      <div>
        <p>Statistic downloading...</p>
      </div>
    );
  }
}
