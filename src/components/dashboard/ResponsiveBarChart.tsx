import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";

type TResponsiveBarChartProps = {
  kpi: string;
  data: IChartDatum[];
  colors: {
    stroke: string;
    fill: string;
  };
};

export const ResponsiveBarChart = ({
  kpi,
  data,
  colors,
}: TResponsiveBarChartProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {isLoading && (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={1000}
          height={300}
        />
      )}
      {!isLoading && (
        <BarChart
          data={data}
          width={1000}
          height={300}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            tickCount={data?.length ?? 0}
            tick={{
              stroke: "light-grey",
              strokeWidth: 0.5,
              fontSize: "12px",
            }}
          />
          <YAxis
            tickCount={13}
            tick={{
              stroke: "light-grey",
              strokeWidth: 0.5,
              fontSize: "12px",
            }}
            interval="preserveStartEnd"
            domain={[0, "dataMax + 10"]}
          />
          <Tooltip
            content={<ChartTooltip kpi={kpi} colors={colors} />}
            wrapperStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              border: "0 solid #000",
              borderRadius: "10px",
            }}
          />
          <Bar
            dataKey="value"
            fill={colors.fill}
            stroke={colors.stroke}
            strokeWidth={3}
            dot={{
              stroke: colors.stroke,
              strokeWidth: 3,
            }}
            onMouseOver={(event) => {
              // Add hover effect
              event.target.setAttribute("fill", "blue");
            }}
            onMouseOut={(event) => {
              // Reset fill color when mouse leaves
              event.target.setAttribute("fill", colors.fill);
            }}
          />
        </BarChart>
      )}
    </div>
  );
};
