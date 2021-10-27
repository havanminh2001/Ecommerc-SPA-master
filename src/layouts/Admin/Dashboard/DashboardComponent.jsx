import React from 'react'
import CardDashboard from './CardDashboard';
import ChartComponent from './ChartComponent';

export default function DashboardComponent(props) {
    return (
        <div className="list-card row">
            <CardDashboard />
            <ChartComponent />
        </div>
    )
}