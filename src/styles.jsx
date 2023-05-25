import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';

export const COLORS = ['#008001', '#fea500', '#fd0100', '#0100fe'];

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

export const SelectСontainer = styled.div`
  &&& {
    float: right;
  }
`;

export const StyledSelect = styled.select`
  &&& {
    margin-left: 14px;
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
