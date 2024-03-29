import { useEffect, useRef } from 'react';

import ChartJS from 'chart.js/auto';
import { sum } from 'lodash-es';

import { ExerciseIterations } from '../query/iterations/iterations.type';

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

            chart = new ChartJS(ref.current, {
                options,
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: name,
                            data: labels.map(label => {
                                return sum(
                                    data[label].map(({ weight, repeat, time }) => {
                                        const w = weight || 1;
                                        return w * (repeat || 1) * (time || 1);
                                    }),
                                );
                            }),
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
