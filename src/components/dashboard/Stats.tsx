import React from "react";
import { KpiCard } from "./KpiCard";
import { IChartDatum } from "../../interfaces";
import { CurrencyDollarIcon, ShoppingCartIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { GetListResponse } from "@refinedev/core";

type TStats = {
  dailyRevenue?: GetListResponse<IChartDatum>;
  dailyOrders?: GetListResponse<IChartDatum>;
  newCustomers?: GetListResponse<IChartDatum>;
};

const Stats = ({ dailyRevenue, dailyOrders, newCustomers }: TStats) => {
  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-2xl font-bold">Feature Cards</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <KpiCard
          title="Weekly Revenue"
          data={dailyRevenue}
          formatTotal={(value: number | string) => `$ ${value}`}
        />
        <KpiCard
          title="Weekly Orders"
          data={dailyOrders}
        />
        <KpiCard
          title="New Customers"
          data={newCustomers}
        />

      </div>
    </div>
  );
};

export default Stats;
