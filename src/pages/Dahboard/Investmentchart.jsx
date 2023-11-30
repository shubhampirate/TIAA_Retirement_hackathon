import React, { useState, useEffect } from 'react';
import { IgrFinancialChart, IgrFinancialChartModule } from 'igniteui-react-charts';

IgrFinancialChartModule.register();

const StockItem = ({ open, close, high, low, volume, date }) => {
    return (
        <div>
            {/* Customize how each stock item is displayed */}
            <p>Date: {date.toDateString()}</p>
            <p>Open: {open}</p>
            <p>Close: {close}</p>
            <p>High: {high}</p>
            <p>Low: {low}</p>
            <p>Volume: {volume}</p>
        </div>
    );
};

const FinancialChartMultipleData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getMultipleStocks = async () => {
            try {
                const dataSources = [
                    await getGoogleStock(),
                    await getMicrosoftStock(),
                    // Add other stock fetch functions here
                ];

                setData(dataSources);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        getMultipleStocks();
    }, []);

    const getGoogleStock = async () => {
        const url = "https://static.infragistics.com/xplatform/data/stocks/stockGoogle.json";
        const response = await fetch(url);
        const jsonData = await response.json();
        const stockData = convertData(jsonData);

        stockData.__dataIntents = {
            close: ["SeriesTitle/Google"]
        };

        return stockData;
    };

    const getMicrosoftStock = async () => {
        const url = "https://static.infragistics.com/xplatform/data/stocks/stockMicrosoft.json";
        const response = await fetch(url);
        const jsonData = await response.json();
        const stockData = convertData(jsonData);

        stockData.__dataIntents = {
            close: ["SeriesTitle/Microsoft"]
        };

        return stockData;
    };

    const convertData = (jsonData) => {
        return jsonData.map((json) => {
            const parts = json.date.split("-"); // "2020-01-01"
            return {
                date: new Date(parts[0], parts[1] - 1, parts[2]), // Month is 0-indexed
                open: json.open,
                high: json.high,
                low: json.low,
                close: json.close,
                volume: json.volume,
            };
        });
    };

    return (
        <div className="container sample">
            <div className="container" style={{ height: "40rem" }}>
                <IgrFinancialChart
                    width="100%"
                    height="100%"
                    chartType="Line"
                    thickness={2}
                    chartTitle="Google vs Microsoft Changes"
                    subtitle="Between 2013 and 2017"
                    yAxisMode="PercentChange"
                    yAxisTitle="Percent Changed"
                    dataSource={data}
                />
            </div>
        </div>
    );
};

export default FinancialChartMultipleData;
