import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import TRANSLATIONS from './translations';
import { LoginFormSection, FormStyled, ButtonStyled } from './styled.components';

const LoginForm = ({ onClickLogin }) => {
  const [loginValues, setLoginValues] = useState({
    username: 'iwkz',
    password: '1WK2.de!!!',
  });

  const onTextFieldChange = (name) => (event) => {
    setLoginValues({
      ...loginValues,
      [name]: event.target.value,
    });
  };

  const onSubmit = () => onClickLogin(loginValues);

  return (
    <Container component="main" maxWidth="xs">
      <LoginFormSection>
        <h3> Backoffice IWKZ </h3>
        <FormStyled>
          <TextField
            required
            fullWidth
            id="username"
            label={TRANSLATIONS.FORM.USERNAME}
            value={loginValues.username}
            variant="outlined"

            onChange={onTextFieldChange('username')} />
          <TextField
            required
            fullWidth
            id="password"
            label={TRANSLATIONS.FORM.PASSWORD}
            value={loginValues.password}
            variant="outlined"
            type="password"
            autoComplete="current-password"

            onChange={onTextFieldChange('password')} />
          <ButtonStyled
            type="submit"
            fullWidth
            variant="contained"
            color="primary"

            onClick={onSubmit}>
            {TRANSLATIONS.FORM.SUBMIT}
          </ButtonStyled>
        </FormStyled>
      </LoginFormSection>
    </Container>
  );
};

LoginForm.propTypes = {
  onClickLogin: PropTypes.func,
};

LoginForm.defaultProps = {
  onClickLogin: null,
};

export default LoginForm;
