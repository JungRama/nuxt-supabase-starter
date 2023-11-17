<template>
  <Bar 
  :data="{
    labels: Array.from({ length: 20 }, () => ''),
    datasets: [ 
    {
      label: '1',
      backgroundColor: '#4ade80',
      hoverBackgroundColor: '#00732a',
      data: Array.from({ length: 20 }, () =>
        Math.floor(Math.random() * (100 - 0 + 1)) + 0
      )
    }
    ]
  }" 
  :options="{
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
    },
    scales:{
      x: {
        border: {
          display: false
        },
        display: false,
      },
      y: {
        border: {
          display: false
        },
        display: false,
      }
    }
  }" />
</template>

<script setup lang="ts" >
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  import { Bar } from 'vue-chartjs'

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
</script>