
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';

export const Header = styled(AppBar)`
  ${({ theme }) => `
    z-index: ${theme.zIndex.drawer + 1} !important;

    .navButton {
      margin-right: ${theme.spacing(2)};

      ${[theme.breakpoints.up('sm')]} {
        display: none !important;
      }
    }

    .headerTitle {
      flex-grow: 1;
    }
  `}
`;

export const StyledIcon = styled(IconButton)`
  ${({ theme }) => `
    margin-right: ${theme.spacing(2)} !important;

    ${[theme.breakpoints.up('sm')]} {
      display: none !important;
    }
  `}
`;
