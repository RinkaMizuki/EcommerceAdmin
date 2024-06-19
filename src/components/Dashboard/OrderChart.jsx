import * as React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { format, subDays, addDays } from "date-fns";
import { FORMAT_DATE } from "./Dashboard";
import { useGetList } from "react-admin";

const lastDay = new Date();
//loop and minus by index
const lastMonthDays = Array.from({ length: 31 }, (_, i) => subDays(lastDay, i));
//get month ago with current date
const aMonthAgo = subDays(lastDay, 30);
const dateFormatter = (date) => new Date(date).toLocaleDateString();

//map date with price
const aggregateOrdersByDay = (orders) =>
    orders.reduce((acc, curr) => {
        const day = format(new Date(curr.orderDate), FORMAT_DATE);
        if (!acc[day]) {
            acc[day] = 0;
        }
        acc[day] += curr.totalPrice;
        return acc;
    }, {});

const getRevenuePerDay = (orders) => {
    const daysWithRevenue = aggregateOrdersByDay(orders);
    return lastMonthDays.map((date) => ({
        date: date.getTime(),
        total: daysWithRevenue[format(new Date(date), FORMAT_DATE)] || 0,
    }));
};

const OrderChart = () => {
    const { data: orders = [] } = useGetList("orders", {
        filter: {
            orderedSince: dateFormatter(aMonthAgo),
            orderedBefore: dateFormatter(lastDay),
        },
        sort: { field: "OrderDate", order: "DESC" },
        pagination: { page: 1, perPage: 100 },
    });
    console.log(orders);
    if (!orders) return null;
    return (
        <Card>
            <CardHeader title="30 Day Revenue History" />
            <CardContent>
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={getRevenuePerDay(orders)}>
                            <defs>
                                <linearGradient
                                    id="colorUv"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#8884d8"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#8884d8"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                name="Date"
                                type="number"
                                scale="time"
                                domain={[
                                    addDays(aMonthAgo).getTime(),
                                    new Date().getTime(),
                                ]}
                                tickFormatter={dateFormatter}
                            />
                            {/* <YAxis dataKey="total" name="Revenue" unit="đ" /> */}
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip
                                cursor={{ strokeDasharray: "3 3" }}
                                formatter={(value) =>
                                    new Intl.NumberFormat(undefined, {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(value)
                                }
                                labelFormatter={(label) => dateFormatter(label)}
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#8884d8"
                                strokeWidth={2}
                                fill="url(#colorUv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderChart;
