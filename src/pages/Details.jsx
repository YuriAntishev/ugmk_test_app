import React, { useEffect } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts, selectProductsList } from '../rs/slices/productsSlice';
import { collection, sum, dataPieChart } from '../handlers/handlers';
import {
  monthsNames,
  factoriesHeader,
  productsNames,
} from '../helpers/helpers';
import {
  СenteredСontainerPieChart,
  StyledResponsiveContainerPie,
  COLORS,
} from '../styles';

const Details = () => {
  const dispatch = useDispatch();
  const { factoryId, monthNumber } = useParams();

  const products = useSelector(selectProductsList);

  const pieChartData = dataPieChart(
    sum(collection(products), +factoryId, monthNumber)?.[0],
    productsNames
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <СenteredСontainerPieChart>
        <h2>
          Статистика по продукции {factoriesHeader[factoryId - 1]} за{' '}
          {monthsNames[monthNumber - 1]}
        </h2>
        <StyledResponsiveContainerPie height={400} width="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              labelLine={false}
              cx="50%"
              cy="50%"
              label
              outerRadius={150}
              dataKey="value"
            >
              {pieChartData?.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </StyledResponsiveContainerPie>
      </СenteredСontainerPieChart>
    </div>
  );
};

export default Details;
