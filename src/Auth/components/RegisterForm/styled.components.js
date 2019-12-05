import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export const ContainerStyled = styled(Container)`
  ${({ theme }) => `
    margin-top: ${theme.spacing(8)}px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;

export const FormStyled = styled.div`
  ${({ theme }) => `
    div {
      margin-top: ${theme.spacing(1)}px;
    }
  `}
`;

export const ButtonStyled = styled(Button)`
  ${({ theme }) => `
    margin: ${theme.spacing(3, 0, 2)};
  `}
`;
