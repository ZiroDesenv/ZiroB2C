import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../components/COLOR';
import InformaInfos from '../../components/informaInfos';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';
import Botao from '../../components/botaoConfirma';
import {
  validaEmailRegex,
  validaSenhaRegex,
  validaNumeroCelularRegex,
  generateUUID,
} from '../../components/regex';
import {saveLogin} from '../../repository/Login.repository.js';
import CheckBox from '../../components/checkBox.js';
import Alerta from '../../components/alerta.js';

const Cadastro = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [validaEmail, setValidaEmail] = useState('');
  const [validaSenha, setValidaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [numeroUsuario, setNumeroUsuario] = useState('');
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [aceitaNovidades, setAceitaNovidades] = useState(false);
  const [alerta, setAlerta] = useState();

  const navigation = useNavigation();

  const verSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const navegarParaLogin = () => {
    navigation.navigate('Login');
  };

  const validaRegexs = () => {
    if (!validaEmailRegex(validaEmail)) {
      ToastAndroid.show('Favor informar um e-mail válido', ToastAndroid.SHORT);
      return false;
    }

    if (!validaSenhaRegex(validaSenha)) {
      ToastAndroid.show('Favor informar uma senha válida', ToastAndroid.SHORT);
      return false;
    }

    if (!validaNumeroCelularRegex(numeroUsuario)) {
      ToastAndroid.show(
        'Favor informar um número de celular válido',
        ToastAndroid.SHORT,
      );
      return false;
    }

    return true;
  };

  const criarConta = async () => {
    if (!aceitaTermos) {
      setAlerta({
        visivel: true,
        exibeFechar: true,

        mensagem: 'Favor aceite os termos para realizar o cadastro',
      });
      return;
    }
    if (
      validaRegexs() &&
      validaSenha === confirmarSenha &&
      aceitaTermos === true
    ) {
      console.log('Todos os dados estão corretos!');
      const id = generateUUID();
      try {
        await saveLogin({
          id: id,
          email: validaEmail,
          password: validaSenha,
          nomeUsuario: nomeUsuario,
          number: numeroUsuario,
        });
      } catch (error) {
        console.log('Erro ao salvar dados de login:', error);
      }
      setAlerta({
        visivel: true,
        exibeFechar: true,
        mensagem: 'Cadastro efetuado com sucesso!',
        verificadoVerde: true,
        onFechar: () => {
          navegarParaLogin();
        },
      });
    } else {
      console.log('oi');
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.baseCA,
        flex: 1,
      }}>
      <View style={styles.logoApp}>
        <Icon name="football" size={250} color={'blue'} />
      </View>

      <View style={styles.containerLogin}>
        <View style={styles.loginNome}>
          <InformaInfos
            placeholder="Seu nome"
            iconeSimples="user"
            onChangeText={text => setNomeUsuario(text)}
            value={nomeUsuario}
          />
        </View>

        <View style={styles.loginNumero}>
          <InformaInfos
            placeholder="xx 9xxxxx72"
            iconeSimples="phone"
            keyboardType="numeric"
            onChangeText={text => setNumeroUsuario(text)}
            value={numeroUsuario}
          />
        </View>

        <View style={styles.loginEmail}>
          <InformaInfos
            placeholder="E-mail"
            icon="email-outline"
            onChangeText={text => setValidaEmail(text)}
            value={validaEmail}
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

        <View style={styles.loginSenha}>
          <InformaInfos
            placeholder="Confirmar Senha"
            senha={!mostrarSenha}
            icon={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
            clicouNoIcone={verSenha}
            onChangeText={text => setConfirmarSenha(text)}
            value={confirmarSenha}
          />
        </View>
      </View>
      <View style={styles.loginCadastrar}>
        <Pressable onPress={navegarParaLogin}>
          <Text style={styles.loginCadastrarText}>
            Já possui uma conta? Faça o login
          </Text>
        </Pressable>
      </View>

      <View style={{padding: 30}}>
        <CheckBox
          onPressCheckBox={() => setAceitaTermos(!aceitaTermos)}
          clicouCheckBox={aceitaTermos}
          textoCheckBox={'Aceitar os termos de usuário'}
        />

        <CheckBox
          onPressCheckBox={() => setAceitaNovidades(!aceitaNovidades)}
          clicouCheckBox={aceitaNovidades}
          textoCheckBox={'Aceitar receber novidades do Ziro '}
        />
      </View>

      <View style={styles.loginConfirmar}>
        <Botao texto="Criar Conta" onPress={criarConta} />
      </View>

      {alerta?.visivel && (
        <Alerta
          titulo={alerta.titulo}
          mensagem={alerta.mensagem}
          posicao={alerta.posicao}
          exibeFechar={alerta.exibeFechar}
          exibeContinuar={alerta.exibeContinuar}
          textoContinuar={alerta.textoContinuar}
          verificadoVerde={alerta.verificadoVerde}
          onFechar={() =>
            (alerta.onFechar && alerta.onFechar()) ??
            setAlerta({visivel: false})
          }
          onContinuar={alerta.onContinuar}
        />
      )}
    </ScrollView>
  );
};

export default Cadastro;

const styles = StyleSheet.create({
  logoApp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  containerLogin: {
    padding: 20,
  },
  loginNome: {
    marginTop: 35,
  },
  loginNumero: {
    marginTop: 35,
  },
  loginEmail: {
    marginTop: 35,
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
  loginConfirmar: {
    marginBottom: 50,
  },
});
