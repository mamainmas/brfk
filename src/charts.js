{
  /* <script> */
}
window.addEventListener("load", () => {
  (function () {
    buildChart(
      "#chart-portfolio",
      (mode) => ({
        chart: {
          height: 300,
          type: "area",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        series: [
          {
            name: "Reward",
            data: [18000, 51000, 60000, 38000, 88000, 50000, 40000],
          },
        //   {
        //     name: "Outcome",
        //     data: [27000, 38000, 60000, 77000, 40000, 50000, 49000],
        //   },
        ],
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          width: 2,
        },
        grid: {
          strokeDashArray: 2,
        },
        fill: {
          type: "gradient",
          gradient: {
            type: "vertical",
            shadeIntensity: 1,
            opacityFrom: 0.1,
            opacityTo: 0.8,
          },
        },
        xaxis: {
          type: "category",
          tickPlacement: "on",
          categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            stroke: {
              dashArray: 0,
            },
            dropShadow: {
              show: false,
            },
          },
          tooltip: {
            enabled: false,
          },
          labels: {
            style: {
              colors: "#9ca3af",
              fontSize: "13px",
              fontFamily: "Inter, ui-sans-serif",
              fontWeight: 400,
            },
            formatter: (title) => title,
          },
        },
        yaxis: {
          labels: {
            align: "left",
            minWidth: 0,
            maxWidth: 140,
            style: {
              colors: "#9ca3af",
              fontSize: "13px",
              fontFamily: "Inter, ui-sans-serif",
              fontWeight: 400,
            },
            formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
          },
        },
        tooltip: {
          x: {
            format: "MMMM yyyy",
          },
          y: {
            formatter: (value) =>
              `$${value >= 1000 ? `${value / 1000}k` : value}`,
          },
          custom: function (props) {
            const { categories } = props.ctx.opts.xaxis;
            const { dataPointIndex } = props;
            const title = categories[dataPointIndex];
            const newTitle = title;

            return buildTooltip(props, {
              title: newTitle,
              mode,
              hasTextLabel: true,
              wrapperExtClasses: "min-w-[120px]",
              labelDivider: ":",
              labelExtClasses: "ms-2",
            });
          },
        },
        responsive: [
          {
            breakpoint: 568,
            options: {
              chart: {
                height: 300,
              },
              labels: {
                style: {
                  colors: "#9ca3af",
                  fontSize: "11px",
                  fontFamily: "Inter, ui-sans-serif",
                  fontWeight: 400,
                },
                offsetX: -2,
                formatter: (title) => title,
              },
              yaxis: {
                labels: {
                  align: "left",
                  minWidth: 0,
                  maxWidth: 140,
                  style: {
                    colors: "#9ca3af",
                    fontSize: "11px",
                    fontFamily: "Inter, ui-sans-serif",
                    fontWeight: 400,
                  },
                  formatter: (value) =>
                    value >= 1000 ? `${value / 1000}k` : value,
                },
              },
            },
          },
        ],
      }),
      {
        colors: ["#2563eb", "#9333ea"],
        fill: {
          gradient: {
            stops: [0, 90, 100],
          },
        },
        grid: {
          borderColor: "#e5e7eb",
        },
      },
      {
        colors: ["#3b82f6", "#a855f7"],
        fill: {
          gradient: {
            stops: [100, 90, 0],
          },
        },
        grid: {
          borderColor: "#374151",
        },
      }
    );
  })();
});
{
  /* </script> */
}
