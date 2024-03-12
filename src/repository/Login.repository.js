//import {getLocalDBConnection, select} from '../repository/util/sqlitemanager';
import {select, execute} from '../services/bancoLocal';

export const saveLogin = async item => {
  await execute('DELETE FROM LOGIN');

  try {
    const sql = 'INSERT INTO LOGIN VALUES (?,?,?,?, ?)';
    await execute(sql, [
      item.id,
      item.number,
      item.email,
      item.password,
      item.nomeUsuario,
    ]);
  } catch (error) {
    await execute('DELETE FROM LOGIN');

    const sql = 'INSERT INTO LOGIN VALUES (?,?,?,?, ?)';
    await execute(sql, [
      item.id,
      item.number,
      item.email,
      item.password,
      item.nomeUsuario,
    ]);
  }
};

export const getLogin = async () => {
  const sql = 'SELECT * FROM LOGIN';
  const results = await select(sql);

  return results[0];
};
