import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";

type TResponsiveAreaChartProps = {
  kpi: string;
  data: IChartDatum[];
  additionalData: IChartDate[]; 
  colors: {
    stroke: string;
    fill: string;
    dashedStroke: string; 
  };
};

export const ResponsiveAreaChart = ({
  kpi,
  data,
  additionalData,
  colors,
}: TResponsiveAreaChartProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(delay);
  }, []); // Run only once on component mount

  const margin = { top: 10, right: 30, left: 0, bottom: 0 };

  return (
    <ResponsiveContainer width="90%" height={300}>
      {isLoading ? ( // Show skeleton loading if data is loading
        <Skeleton animation="wave" variant="rounded" width="80%" height={250} />
      ) : ( // Render chart if data is loaded
        <LineChart data={data} margin={margin}>
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
            domain={[0, "dataMax + 20"]}
          />
          <Tooltip
            content={<ChartTooltip kpi={kpi} colors={colors} />}
            wrapperStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              border: "0 solid #000",
              borderRadius: "10px",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={colors?.stroke}
            strokeWidth={3}
            dot={{
              stroke: colors?.stroke,
              strokeWidth: 3,
            }}
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};
