import { useEffect, useRef } from 'react';

import ChartJS from 'chart.js/auto';
import { sum } from 'lodash-es';

import { ExerciseIterations } from '../query/iterations/iterations.type';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Прогрес',
        },
    },
};

interface Props {
    name: string;
    data: Record<string, ExerciseIterations[]>;
}
const Chart = ({ name, data }: Props): JSX.Element => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let chart: ChartJS;
        if (ref.current) {
            const labels = Object.keys(data).reverse();
            console.log(labels.map(label => sum(data[label].map(item => item.weight))));

            chart = new ChartJS(ref.current, {
                options,
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: name,
                            data: labels.map(label =>
                                sum(data[label].map(item => (item.weight || 1) * (item.repeat || 1) * (item.time || 1))),
                            ),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                },
            });
        }
        return () => {
            chart.destroy();
        };
    }, [data, name]);

    return <canvas ref={ref} height="400px" style={{ marginBottom: '40px' }} />;
};

export default Chart;
