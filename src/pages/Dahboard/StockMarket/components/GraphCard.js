import React, { useEffect, useRef } from 'react';
import '../css/GraphCard.css';

const GraphCard = (props) => {
  const chartRef = useRef(null);
  const Chart = window.Chart;
  useEffect(() => {
    if (props.showGraphData) {
      const lowOrHighColor =
        props.graphData.y_axis[0] < props.graphData.y_axis[props.graphData.y_axis.length - 1]
          ? '#81b737'
          : '#d54f4f';

      const myChartRef = chartRef.current.getContext("2d");
      new Chart(myChartRef, {
        type: "line",
        data: {
          labels: props.graphData.x_axis,
          datasets: [
            {
              data: props.graphData.y_axis,
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderColor: lowOrHighColor,
            },
          ],
        },
        options: {
          responsive: true,
          tooltips: {
            enabled: true,
            mode: 'point',
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  display: false,
                },
                gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  display: true,
                  stepSize: 5,
                },
                gridLines: {
                  display: false,
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            ],
          },
          legend: {
            display: false,
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        },
      });
    }
  }, [props.showGraphData, props.graphData.x_axis, props.graphData.y_axis]);

  const convertToDate = (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  return (
    <div className="main__chart" id={'myChart-' + props.graphData.stockValue}>
      <div>
        <h2 className="h5 mb-3 stockValue">
          {props.graphData.stockValue}
          {props.graphData.date_data ? (
            <div className="ml-2 d-inline">
              <span>
                (
                {convertToDate(props.graphData.date_data.filteredStartDate)} &nbsp;to&nbsp;
                {convertToDate(props.graphData.date_data.filteredEndDate)}
                )
              </span>
            </div>
          ) : (
            <div className="ml-2 d-inline">(Last 72 Hours)</div>
          )}
        </h2>
        <canvas className="myChart" ref={chartRef} />
      </div>
    </div>
  );
};

export default GraphCard;
