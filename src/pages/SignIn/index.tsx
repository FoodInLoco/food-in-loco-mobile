import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { RequestSignIn } from '../../interfaces/user/login/request.signIn.interface';

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

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  console.log(signIn);
  const navigation = useNavigation();
  const [request, setRequest] = useState<RequestSignIn>({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const imagePath = '../../../assets/foodInLoco.png';

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleSubmit = async () => {
    try {
      console.log(request);
      const response = await signIn(request);
      console.log(response);

      if (response != null) {
        setErrorMessage(response);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Email ou senha inválidos!');
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
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUpPress} style={styles.button}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      </View>
    </View>
  );
};

export default SignIn;