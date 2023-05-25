import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';

export const StyledResponsiveContainer = styled(ResponsiveContainer)`
  &&& {
    padding: 10px;
    border: 2px solid black;
    border-radius: 14px;
  }
`;

export const StyledResponsiveContainerPie = styled(ResponsiveContainer)`
  &&& {
    padding: 10px;

    /* .recharts-wrapper {
      height: 100% !important;

      /* .recharts-surface {
        height: 370px !important;
      } */
  }
`;

export const СenteredСontainerSelect = styled.div`
  &&& {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

export const СenteredСontainerChart = styled.div`
  &&& {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const СenteredСontainerPieChart = styled.div`
  &&& {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
