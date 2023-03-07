import { range } from 'lodash-es';

export const weekList = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
export const monthList = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
];

export const date = new Date();
export const allYears = range(date.getFullYear() - 2, date.getFullYear() + 2);
