import styled from 'styled-components';
import List from '@material-ui/core/List';

export const ToolbarSection = styled.div`
  ${({ theme }) => theme.mixins.toolbar}
`;

export const CustomList = styled(List)`
  li.MuiCollapse-container {
    padding-left: 20px;
  }
`;
