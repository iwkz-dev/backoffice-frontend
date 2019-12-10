import styled from 'styled-components';

export const FilterSection = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div.MuiFormControl-root {
    width: 50%;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    
    div.MuiFormControl-root {
      width: 100%;
      margin-bottom: 20px;
    }
    button {
      width: 100%;
    }
  }
`;
