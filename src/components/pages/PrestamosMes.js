import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

const PrestamosMes = () => {
  const [prestamosPorMes, setPrestamosPorMes] = useState([]);

  useEffect(() => {
    const fetchPrestamosPorMes = async () => {
      const response = await axios.get(`http://localhost:8000/api/prestamos/mes`);
      const orderedData = response.data.sort((a, b) => new Date(`2022-${a.mes}-01`) - new Date(`2022-${b.mes}-01`));
      setPrestamosPorMes(orderedData);
    };

    fetchPrestamosPorMes();
  }, []);

  const data = {
    labels: prestamosPorMes.map((item) => item.mes),
    datasets: [
      {
        label: "Préstamos por mes",
        data: prestamosPorMes.map((item) => item.total),
        backgroundColor: prestamosPorMes.map(
          () =>
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, 0.5)`
        ),
      },
    ],
  };

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Préstamos por mes</h1>
      <Bar options={options} data={data} />
    </div>
  );
};

export default PrestamosMes;
