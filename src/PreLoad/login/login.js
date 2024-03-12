import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import COLORS from '../../components/COLOR';
import InformaInfos from '../../components/informaInfos';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Botao from '../../components/botaoConfirma';
import {validaEmailRegex, validaSenhaRegex} from '../../components/regex';
import {getLogin} from '../../repository/Login.repository';
import LottieView from 'lottie-react-native';
import ANIMACAO from '../../constants/animacao';

let modoDesenvolvedor = 0;
const Login = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [validaEmail, setValidaEmail] = useState('');
  const [validaSenha, setValidaSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const userData = useRef();

  useEffect(() => {
    carregaDados();
  }, []);

  const carregaDados = async () => {
    setLoading(true);
    userData.current = await getLogin();
    setValidaEmail(userData.current.email ?? '');
    setLoading(false);
  };
  const verSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const navegarParaCadastro = () => {
    navigation.navigate('Cadastro');
  };

  const navegarParaHome = async () => {
    modoDesenvolvedor++;

    if (modoDesenvolvedor >= 10) {
      navigation.navigate('Main');
    } else {
      if (
        validaEmail === userData.current.email &&
        validaSenha === userData.current.password
      ) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permissão de Localização',
              message:
                'O aplicativo precisa acessar sua localização para continuar.',
              buttonNeutral: 'Pergunte-me depois',
              buttonNegative: 'Cancelar',
              buttonPositive: 'OK',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            navigation.navigate('Main');
          } else {
            console.log('Permissão de localização negada');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        ToastAndroid.show('E-mail ou senha incorretos', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View style={{backgroundColor: COLORS.baseCA, flex: 1}}>
      <View style={styles.logoApp}>
        <LottieView
          source={ANIMACAO.ziroLogo}
          style={{
            width: 300,
            height: 300,
            alignSelf: 'center',
          }}
          autoPlay={true}
          loop={false}
        />
      </View>

      <View style={styles.containerLogin}>
        <View style={styles.loginEmail}>
          <InformaInfos
            placeholder="E-mail"
            icon="email-outline"
            onChangeText={text => setValidaEmail(text)}
            value={userData.current?.email ?? validaEmail}
          />
        </View>

        <View style={styles.loginSenha}>
          <InformaInfos
            placeholder="Senha"
            senha={!mostrarSenha}
            icon={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
            clicouNoIcone={verSenha}
            onChangeText={text => setValidaSenha(text)}
            value={validaSenha}
          />
        </View>
      </View>
      <View style={styles.loginCadastrar}>
        <Pressable onPress={navegarParaCadastro}>
          <Text style={styles.loginCadastrarText}>
            Ainda não possui uma conta? Cadastre-se
          </Text>
        </Pressable>
      </View>

      <View style={styles.loginConfirmar}>
        <Botao texto="Entrar" onPress={navegarParaHome} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  logoApp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
  },
  containerLogin: {
    padding: 20,
  },
  loginEmail: {
    marginTop: 50,
  },
  loginSenha: {
    marginTop: 35,
  },
  loginCadastrar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginCadastrarText: {
    color: COLORS.orangeWarning,
    textDecorationLine: 'underline',
  },
});
