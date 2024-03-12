import React, {useEffect, useState} from 'react';
import {Modal, View, Text, StyleSheet, StatusBar} from 'react-native';
import BotaoPadrao from './botaoPadrao';
import COLORS from './COLOR';
import BotaoNeutro from './botaoNeutro';
import SIZES from '../constants/sizes';
import LottieView from 'lottie-react-native';
import ANIMACAO from '../constants/animacao';

const Alerta = props => {
  const {posicao, textoContinuar} = props;

  const containerAlignItems = posicao === 'bottom' ? 'flex-end' : 'center';
  const widthModal = posicao === 'bottom' ? SIZES.width : SIZES.width * 0.8;
  const borderRadiusModal = posicao === 'bottom' ? 0 : 20;

  useEffect(() => {
    const timeout = setTimeout(() => {
      StatusBar.setBackgroundColor(COLORS.corDeFundoModal);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={{...styles.container, alignItems: containerAlignItems}}>
        <View
          style={{
            ...styles.modal,
            width: widthModal,
            borderRadius: borderRadiusModal,
          }}>
          {!props.titulo && !props.verificadoVerde && (
            <LottieView
              source={ANIMACAO.warningAnimation}
              style={{
                width: 85,
                height: 85,
                alignSelf: 'center',
              }}
              autoPlay={true}
              loop={false}
            />
          )}
          {!props.titulo && props.verificadoVerde && (
            <LottieView
              source={ANIMACAO.verificadoVerde}
              style={{
                width: 85,
                height: 85,
                alignSelf: 'center',
              }}
              autoPlay={true}
              loop={false}
            />
          )}
          {props.titulo && (
            <Text style={{...styles.titulo, ...props.style}}>
              {props.titulo ?? 'Carregando os dados'}
            </Text>
          )}
          <Text style={styles.mensagem}>
            {props.mensagem ?? 'Aguarde um momento...'}
          </Text>
          {props.children}
          <View>
            {props.exibeFechar && (
              <BotaoPadrao
                style={styles.fechar}
                color={COLORS.orangeWarning}
                texto="Ok"
                botaoGrande={true}
                onPress={() => {
                  console.log('aqui');
                  StatusBar.setBackgroundColor(COLORS.retornaCorPadrao);
                  props.onFechar && props.onFechar();
                }}
              />
            )}
            {props.exibeContinuar && (
              <>
                <BotaoPadrao
                  style={styles.continuar}
                  color={COLORS.greenBarraMeta}
                  texto={textoContinuar ?? 'Continuar'}
                  botaoGrande={true}
                  onPress={() => {
                    StatusBar.setBackgroundColor(COLORS.retornaCorPadrao);
                    props.onContinuar && props.onContinuar();
                  }}
                />
                <BotaoNeutro
                  style={{marginBottom: 20}}
                  texto={props.textoCancelar ?? 'Cancelar'}
                  botaoGrande={true}
                  onPress={() => {
                    StatusBar.setBackgroundColor(COLORS.retornaCorPadrao);
                    props.onFechar && props.onFechar();
                  }}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Alerta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: '#8d8d8dcc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 17.5,
    paddingTop: 40,
    paddingBottom: 24.5,
    justifyContent: 'center',
  },
  imagemTopo: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.orangeWarning,
    marginBottom: 15,
    alignSelf: 'center',
  },
  mensagem: {
    fontSize: 14,
    color: COLORS.base74,
    textAlign: 'center',
    marginBottom: 20,
  },
  fechar: {
    marginTop: 40,
  },
  continuar: {
    marginTop: 20,
    marginBottom: 20,
  },
});
