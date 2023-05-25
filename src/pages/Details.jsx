import React, { useEffect } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getProducts, selectProductsList } from '../rs/slices/productsSlice';
import {
  monthsNames,
  factoriesHeader,
  productsNames,
} from '../helpers/helpers';
import {
  СenteredСontainerPieChart,
  StyledResponsiveContainerPie,
} from '../styles';

const COLORS = ['#008001', '#fea500'];

const Details = () => {
  const dispatch = useDispatch();
  const { factoryId, monthNumber } = useParams();

  const products = useSelector(selectProductsList);

  const collection = products
    ?.filter(({ date, product1, product2 }) => date || product1 || product2)
    ?.map((x) => ({
      ...x,
      date: x.date && dayjs(x.date, 'D/M/YYYY').get('month'),
    }))
    .sort((a, b) => parseFloat(a.date) - parseFloat(b.date));

  const sum = (inputs, factoryId, monthNumber) => {
    const result = {};
    inputs
      ?.filter(({ factory_id }) => factory_id === factoryId)
      ?.forEach((input) => {
        const key = `${input.date}`;
        if (key in result) {
          result[key].product1 += input.product1;
          result[key].product2 += input.product2;
        } else {
          result[key] = { ...input };
        }
      });
    return Object.values(result)?.filter(
      ({ date }) => date === monthNumber - 1
    );
  };

  const dataPieChart = (obj) =>
    Object.keys(obj)?.reduce((acc, key) => {
      if (key === 'product1') {
        acc.push({
          name: productsNames[0],
          value: obj[key],
        });
      }
      if (key === 'product2') {
        acc.push({
          name: productsNames[1],
          value: obj[key],
        });
      }
      return acc;
    }, []);

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
              data={dataPieChart(sum(collection, +factoryId, monthNumber)[0])}
              labelLine={false}
              cx="50%"
              cy="50%"
              label
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {dataPieChart(sum(collection, +factoryId, monthNumber)[0]).map(
                (_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                )
              )}
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
