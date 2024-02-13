window.addEventListener('load', () => {
    (function () {
      buildChart('#pie-chart', () => ({
        chart: {
          height: '65%',
          type: 'pie',
          zoom: {
            enabled: false
          }
        },
        series: [70, 18, 12],
        labels: ['Income', 'Outcome', 'Others'], // Added labels
        title: {
          show: false
        },
        dataLabels: {
          enabled: false // Removed labeled percentage inside the chart
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -15
            }
          }
        },
        legend: {
          show: false
        },
        stroke: {
          width: 4,
          colors: ['rgb(255, 255, 255)']
        },
        colors: ['#004487', '#004f9c', '#762875'], // Specified colors
        grid: {
          padding: {
            top: -10,
            bottom: -14,
            left: -9,
            right: -9
          }
        },
        tooltip: {
          enabled: false
        },
        states: {
          hover: {
            filter: {
              type: 'none'
            }
          }
        }
      }), {
        colors: ['#004487', '#004f9c', '#762875'], // Specified colors
        stroke: {
          colors: ['rgb(255, 255, 255)']
        }
      });
    })();
  });
