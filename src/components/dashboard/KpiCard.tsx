import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

type TKpiCardProps = {
  title: string;
  data: any;
  icon: JSX.Element;
  colors: {
    stroke: string;
    fill: string;
  };
  formatTotal?: (value: number | string) => typeof value;
};

export const KpiCard = ({
  title,
  data,
  icon,
  colors,
  formatTotal = (value) => value,
}: TKpiCardProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const total = data?.data?.total;
  const trend = data?.data?.trend;
  const calc = Math.round((trend / total) * 100);
  const percent = total > trend ? `+ ${calc}%` : `- ${calc}%`;
  const textColor = total > trend ? "seagreen" : "crimson";

  return (
    <div
      className="stat my-2 py-4 flex-1 bg-zinc-50 border-l-4 rounded transition duration-300 hover:bg-gray-100"
      style={{ borderColor: colors?.stroke }}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">

        <Skeleton animation="wave" variant="rounded" width="110%" height={100} />
        </div>
      ) : (
        <>
          <div
            className="stat-figure text-secondary"
            style={{ color: colors?.fill }}
          >
            {icon}
          </div>
          <div className="stat-title text-l">{title}</div>
          <div
            className="stat-value text-sm"
            style={{ color: colors?.stroke }}
          >
            {formatTotal(total ?? "...")}
          </div>
          <div className="stat-desc my-2">
            <span
              className="mx-1 text-l font-bold"
              style={{ color: textColor }}
            >
              {percent}
            </span>
            since last week
          </div>
        </>
      )}
    </div>
  );
};
