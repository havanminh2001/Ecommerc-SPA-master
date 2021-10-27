import React, { useEffect } from 'react';
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
import { getMonthByString } from '../../../utils/helper';
import * as actions from './modules/Actions';

export default function ChartComponent() {
    const dispatch = useDispatch();
    const category = useSelector(state => state.DashBoardReducer.chart.category);
    const user = useSelector(state => state.DashBoardReducer.chart.user);
    const order = useSelector(state => state.DashBoardReducer.chart.order);
    const date = new Date();
    useEffect(() => {
        if (!(user.data.length > 0 && order.data.length > 0 && category.data.length > 0)) {
            dispatch(actions.chartAction());
        }
    }, []);
    return (
        <>
            <div className="col-lg-8 col-12 mt-5">
                <Bar
                    data={{
                        labels: user.label,
                        datasets: [
                            {
                                label: `User Register ${date.getFullYear()}`,
                                backgroundColor: user.color,
                                data: user.data
                            }
                        ]
                    }}
                    options={{
                        legend: { display: false },
                        title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                        }
                    }}
                />
            </div>
            <div className="col-lg-4 col-12 mt-5">
                <Doughnut
                    data={{
                        labels: category.label,
                        datasets: [
                            {
                                label: "Total product",
                                backgroundColor: category.color,
                                data: category.data
                            }
                        ]
                    }}
                    option={{
                        title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                        }
                    }}
                />
            </div>
            <div className="col-12 my-5">
                <Line
                    data={{
                        labels: [
                            getMonthByString(1),
                            getMonthByString(2),
                            getMonthByString(3),
                            getMonthByString(4),
                            getMonthByString(5),
                            getMonthByString(6),
                            getMonthByString(7),
                            getMonthByString(8),
                            getMonthByString(9),
                            getMonthByString(10),
                            getMonthByString(11),
                            getMonthByString(12)
                        ],
                        datasets: [
                            {
                                data: order.data,
                                label: `Orders by Month in ${date.getFullYear()}`,
                                borderColor: "#3e95cd",
                                backgroundColor: "rgba(75,192,192,0.2)",
                                fill: true
                            },
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: "World population per region (in millions)"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }}
                />
            </div>
        </>
    )
}
