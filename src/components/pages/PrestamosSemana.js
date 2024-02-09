import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: "y",
  plugins: {
    title: {
      display: true,
      text: "Préstamos por semana",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const PrestamosSemana = () => {
  const [prestamosPorSemana, setPrestamosPorSemana] = useState([]);

  useEffect(() => {
    const fetchPrestamosPorSemana = async () => {
      const response = await axios.get(`http://localhost:8000/api/prestamos/semana`);
      const orderedData = response.data.sort((a, b) => new Date(`2022-${a.mes}-01`) - new Date(`2022-${b.mes}-01`));
      setPrestamosPorSemana(orderedData);
    };

    fetchPrestamosPorSemana();
  }, []);

  const data = {
    labels: [...new Set(prestamosPorSemana.map((item) => item.mes))],
    datasets: prestamosPorSemana.map((item, index) => ({
      label: `Semana ${item.semana}`,
      data: prestamosPorSemana.map((item) => item.total),
      backgroundColor: `hsl(${(index * 360) / prestamosPorSemana.length}, 100%, 75%)`,
    })),
  };

  return (
    <div>
      <h1>Préstamos por semana</h1>
      <Bar options={options} data={data} />
    </div>
  );
};

export default PrestamosSemana;
