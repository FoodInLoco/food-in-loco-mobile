import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { RequestSignUp } from '../../interfaces/user/registration/request.signUp.interface';
import { Roles } from '../../interfaces/user/roles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F06465',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    bottom: -20,
    left: 0,
    right: 0,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 50,
    resizeMode: 'contain',
  },
  formContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F06465',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
	const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');
  const [request, setRequest] = useState<RequestSignUp>({
    firstName: '', lastName: '', 
		email: '', password: '', 
    ddd: '', phoneNumber: '', 
    photo: '', roles: Roles.None
  });
  const imagePath = '../../../assets/foodInLoco.png';

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    try {
      const response = await signUp(request);

      if (response != null) {
        setErrorMessage(response);
      }
    } catch (error) {
      setErrorMessage('Algum problema encontrado.');
    }
  };

  const handleChange = (name: string, value: string) => {
    setRequest({ ...request, [name]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.imageContainer}>
          <Image source={require(imagePath)} style={styles.image} />
        </View>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize='none'
          value={request.email}
          onChangeText={(value) => handleChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Senha'
          autoCapitalize='none'
          secureTextEntry
          value={request.password}
          onChangeText={(value) => handleChange('password', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Confirme sua senha'
          autoCapitalize='none'
          secureTextEntry
          value={request.confirmPassword}
          onChangeText={(value) => handleChange('confirmPassword', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Nome'
          autoCapitalize='none'
          value={request.firstName}
          onChangeText={(value) => handleChange('firstName', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Sobrenome'
          autoCapitalize='none'
          value={request.lastName}
          onChangeText={(value) => handleChange('lastName', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='DDD'
          autoCapitalize='none'
          value={request.ddd}
          onChangeText={(value) => handleChange('ddd', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Celular'
          autoCapitalize='none'
          value={request.phoneNumber}
          onChangeText={(value) => handleChange('phoneNumber', value)}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleBackPress} style={styles.button}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      </View>
    </View>
  );
};

export default SignUp;