const validaEmailRegex = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com)$/i;
  return emailRegex.test(email);
};

const validaSenhaRegex = senha => {
  const senhaRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return senhaRegex.test(senha);
};

const validaNumeroCelularRegex = numero => {
  const numeroRegex =
    /^(?:\+?55)?(?:[1-9][1-9])9\d{8}$|^(?:\+?55)?(?:[1-9][1-9])[1-9]{1}\d{7}$/;
  return numeroRegex.test(numero);
};

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export {
  validaEmailRegex,
  validaSenhaRegex,
  validaNumeroCelularRegex,
  generateUUID,
};
