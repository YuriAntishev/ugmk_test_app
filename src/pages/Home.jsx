import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getProducts, selectProductsList } from '../rs/slices/productsSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { monthsNames, factories } from '../helpers/helpers';
import {
  StyledResponsiveContainer,
  СenteredСontainerSelect,
  СenteredСontainerChart,
} from '../styles';

dayjs.extend(customParseFormat);

const data = [
  {
    name: 'Page A',
    'Фабрика Б': 4000,
    'Фабрика А': 2400,
  },
  {
    name: 'Page B',
    'Фабрика Б': 3000,
    'Фабрика А': 1398,
  },
  {
    name: 'Page C',
    'Фабрика Б': 2000,
    'Фабрика А': 9800,
  },
  {
    name: 'Page D',
    'Фабрика Б': 2780,
    'Фабрика А': 3908,
  },
  {
    name: 'Page E',
    'Фабрика Б': 1890,
    'Фабрика А': 4800,
  },
  {
    name: 'Page F',
    'Фабрика Б': 2390,
    'Фабрика А': 3800,
  },
  {
    name: 'Page G',
    'Фабрика Б': 3490,
    'Фабрика А': 4300,
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(selectProductsList);

  const navigateHandler = (v) => {
    navigate(
      `/details/${factoryId(v?.tooltipPayload?.[0]?.dataKey)}/${
        monthsNames.indexOf(v?.tooltipPayload?.[0]?.payload?.name) + 1
      }`
    );
  };

  console.log('dayjs', monthsNames[dayjs('6/2/2022', 'D/M/YYYY').get('month')]);
  console.log('products', products);
  // console.log('chartData', chartData);

  //////////////////
  const dataT = [
    { date: '8/5/2022', factory_id: 2, product1: 10, product2: 10 },
    { date: '14/5/2022', factory_id: 1, product1: 10, product2: 10 },
    { date: '9/5/2022', factory_id: 1, product1: 10, product2: 10 },
    { date: '8/4/2022', factory_id: 2, product1: 10, product2: 10 },
    { date: '13/4/2022', factory_id: 1, product1: 10, product2: 10 },
    { date: '8/6/2022', factory_id: 1, product1: 45 },
  ];

  const collection = products
    ?.filter(({ date, product1, product2 }) => date || product1 || product2)
    ?.map((x) => ({
      ...x,
      date: x.date && dayjs(x.date, 'D/M/YYYY').get('month'),
    }))
    .sort((a, b) => parseFloat(a.date) - parseFloat(b.date));

  console.log('collection', collection);

  const optimizeSum = (value) => (value ? value : 0);

  // {
  //   name: 'Page A',
  //   'Фабрика Б': 4000,
  //   'Фабрика А': 2400,
  // },

  const sumPerMonth = collection?.reduce((acc, cur) => {
    acc.push({
      name: monthsNames[cur.date],
      [`factory${cur.factory_id}`]:
        optimizeSum(cur.product1) + optimizeSum(cur.product2),
    });
    return acc;
  }, []);

  const result =
    sumPerMonth &&
    Object.values(
      sumPerMonth?.reduce((acc, { name, factory1, factory2 }) => {
        acc[name] = {
          name,
          factory1:
            (acc[name] ? acc[name].factory1 : 0) + optimizeSum(factory1),
          factory2:
            (acc[name] ? acc[name].factory2 : 0) + optimizeSum(factory2),
        };
        return acc;
      }, {})
    );

  const preparedDataForChart = result?.map(
    ({ factory1: value1, factory2: value2, ...rest }) => ({
      'Фабрика А': value1,
      'Фабрика Б': value2,
      ...rest,
    })
  );

  console.log('result', result);
  console.log('sumPerMonth', sumPerMonth);

  //////////////////

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const factoryId = (key) => {
    switch (key) {
      case 'Фабрика А':
        return 1;
      case 'Фабрика Б':
        return 2;
      default:
        return null;
    }
  };

  return (
    <>
      <СenteredСontainerSelect>
        <StyledResponsiveContainer width="80%" aspect={3}>
          <div
            style={{
              float: 'right',
            }}
          >
            Фильтр по типу продукции
            <select name="pets" id="pet-select" style={{ marginLeft: '14px' }}>
              <option value="">Все продукты</option>
              <option value="dog">Продукт 1</option>
              <option value="cat">Продукт 2</option>
            </select>
          </div>
        </StyledResponsiveContainer>
      </СenteredСontainerSelect>

      <СenteredСontainerChart>
        <StyledResponsiveContainer width="80%" aspect={3}>
          <BarChart
            width={700}
            height={300}
            data={preparedDataForChart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Фабрика А" fill="#fd0100" onClick={navigateHandler} />
            <Bar dataKey="Фабрика Б" fill="#0100fe" onClick={navigateHandler} />
          </BarChart>
        </StyledResponsiveContainer>
      </СenteredСontainerChart>
    </>
  );
};

export default Home;
