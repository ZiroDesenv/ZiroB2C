import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getConnection = async () => {
  const db = await SQLite.openDatabase(
    'Local.sqlite',
    '1.0',
    'BancoLocal',
    -1,
    () => {},
    error => console.log(['erro ao abrir o banco', error]),
  );

  const sql =
    "SELECT name FROM sqlite_master WHERE type='table' AND name='LOGIN'";
  //const sql = 'select 1';
  const resultLogin = await db.executeSql(sql, []);

  if (resultLogin[0].rows.length == 0) await createTables();

  return db;

  async function createTables() {
    await db.executeSql(
      'CREATE TABLE IF NOT EXISTS LOGIN (\
      id TEXT NULL,\
      number TEXT NULL,\
      email TEXT,\
      password TEXT,\
      nomeUsuario TEXT\
      )',
    );
  }
};

export const select = async (sql, params) => {
  const db = await getConnection();

  const results = await db.executeSql(sql, params);

  if (results[0].rows.length > 0) {
    const raw = results[0].rows.raw();
    return raw;
  }

  return [];
};

export const execute = async (sql, params) => {
  const db = await getConnection();

  await db.executeSql(sql, params);
};
