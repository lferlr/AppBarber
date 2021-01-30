import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  Container, 
  InputArea, 
  CustomButton, 
  CustomButtonText, 
  SignMessageButton, 
  SignMessageButtonText, 
  SignMessageButtonTextBold 
} from './styles';

import SignInput from '../../components/SignInput';

import ApiServer from '../../ApiServer';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

export default () => {

  const navigation = useNavigation();

  const [ nameField, setNameField ] = useState('');
  const [ emailField, setEmailField ] = useState('');
  const [ passwordField, setPasswordField ] = useState('');

  const handleSignClick = async () => {
    if(nameField != '' && emailField != '' && passwordField != '') {
      let res = ApiServer.signUp(nameField, emailField, passwordField);
      console.log(res);
      if(res) {
        alert("DEU CERTO");
      } else {
        alert("Erro:" + res.error);
      }

    } else {
      alert("Preencha os campos!");
    }
  }
  
  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}]
    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput 
          IconSvg={PersonIcon} 
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={t=>setNameField(t)}
        />

        <SignInput 
          IconSvg={EmailIcon} 
          placeholder="Digite sua e-mail"
          value={emailField}
          onChangeText={t=>setEmailField(t)}
        />

        <SignInput 
          IconSvg={LockIcon} 
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={t=>setPasswordField(t)}
          password={true}
        />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>

      </InputArea>

      <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
      </SignMessageButton>

    </Container>
  );
}
