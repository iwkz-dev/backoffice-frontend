import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'shared/utils/translationsService';

import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { LOGIN_ROOT_PATH } from 'Auth/routes/constants';
import TRANSLATIONS from './translations';
import { ContainerStyled, FormStyled, ButtonStyled } from './styled.components';

const RegisterForm = ({ onClickRegister }) => {
  const [registerValues, setRegisterValues] = useState({
    companyName: '',
    email: '',
    password: '',
  });

  const onTextFieldChange = (field) => (event) => {
    setRegisterValues({
      ...registerValues,
      [field]: event.target.value,
    });
  };

  const onSubmit = () => onClickRegister(registerValues);

  return (
    <ContainerStyled component="main" maxWidth="xs">
      <FormStyled>
        <TextField
          required
          fullWidth
          id="companyName"
          label={translate(TRANSLATIONS.FORM.COMPANY_NAME)}
          value={registerValues.companyName}
          variant="outlined"

          onChange={onTextFieldChange('companyName')} />

        <TextField
          required
          fullWidth
          id="email"
          label={translate(TRANSLATIONS.FORM.EMAIL)}
          value={registerValues.email}
          variant="outlined"

          onChange={onTextFieldChange('email')} />
        <TextField
          required
          fullWidth
          id="password"
          label={translate(TRANSLATIONS.FORM.PASSWORD)}
          value={registerValues.password}
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
          {translate(TRANSLATIONS.FORM.SUBMIT)}
        </ButtonStyled>
        <Grid container>
          <Grid item>
            <Link href={LOGIN_ROOT_PATH} variant="body2">
              {translate(TRANSLATIONS.LOGIN_TEXT)}
            </Link>
          </Grid>
        </Grid>
      </FormStyled>
    </ContainerStyled>
  );
};

RegisterForm.propTypes = {
  onClickRegister: PropTypes.func,
};

RegisterForm.defaultProps = {
  onClickRegister: null,
};

export default RegisterForm;
