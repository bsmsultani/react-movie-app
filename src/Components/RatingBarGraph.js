import React, { useEffect, useRef } from 'react';
import Chart, { plugins } from 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const ratings = data.roles.map((role) => role.imdbRating);
      const bins = createRatingBins(ratings, 1);
      const ratingsCount = countRatings(ratings, bins);

      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: bins.map((bin) => `${bin}-${bin + 1}`),
          datasets: [
            {
              label: 'Number of Ratings',
              data: ratingsCount,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1,
              ticks: {
                font: {
                    size: 40,
                }
              }
            },

            x: {
                ticks: {
                    font: {
                        size: 40,
                    }
                }
            },
          },
        },
      });
    }
  }, [data]);

  const createRatingBins = (ratings, interval) => {
    const maxRating = Math.max(...ratings);
    const minBin = Math.floor(Math.min(...ratings) / interval) * interval;
    const maxBin = Math.ceil(maxRating / interval) * interval;
    const bins = [];

    for (let bin = minBin; bin < maxBin; bin += interval) {
      bins.push(bin);
    }

    return bins;
  };

  const countRatings = (ratings, bins) => {
    const ratingsCount = Array(bins.length).fill(0);

    for (const rating of ratings) {
      const binIndex = Math.floor((rating - bins[0]) / 1);
      if (binIndex >= 0 && binIndex < bins.length) {
        ratingsCount[binIndex]++;
      }
    }

    return ratingsCount;
  };

  return <canvas ref={chartRef} />;
};

export default BarChart;
