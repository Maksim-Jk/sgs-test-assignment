const sql = require("mssql");
require("dotenv").config();
const { cities, workshops, employees } = require("./mock.data");

// Конфигурация подключения к базе данных
const config = {
  user: process.env.DB_USER, // Пользователь для подключения
  password: process.env.DB_PASSWORD, // Пароль для подключения
  server: process.env.DB_SERVER, // Сервер для подключения
  port: parseInt(process.env.DB_PORT), // Порт для подключения
  database: process.env.DB_DEFAULT_DATABASE, // База данных для первичного подключения с последующим созданием новой
  encrypt: false, // Подключение без шифрования
};

// Имя новой базы данных
const newDatabaseName = "CityWorkshopEmployeeDB";

const createAndFillDatabase = async () => {
  try {
    // Подключение к серверу MS SQL
    await sql.connect(config);

    // Удаление базы данных с именем если она существует (для тестирование чтобы не удалять каждый раз вручную)
    const dropDatabaseQuery = `IF EXISTS (SELECT name FROM sys.databases WHERE name = '${newDatabaseName}')
      BEGIN
        ALTER DATABASE ${newDatabaseName} SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
        DROP DATABASE ${newDatabaseName};
      END`;
    await sql.query(dropDatabaseQuery);

    // Создание новой базы данных
    const createDatabaseQuery = `CREATE DATABASE ${newDatabaseName}`;
    await sql.query(createDatabaseQuery);

    // Закрываем текущее подключение
    await sql.close();

    // Изменение конфигурации подключения для новой базы данных
    config.database = newDatabaseName;

    // Подключение к новой базе данных
    await sql.connect(config);

    // Создание таблицы "Cities"
    const createCitiesTableQuery = `
      CREATE TABLE Cities (
        id INT PRIMARY KEY,
        name NVARCHAR(255)
      );
    `;
    await sql.query(createCitiesTableQuery);

    // Создание таблицы "Workshops"
    const createWorkshopsTableQuery = `
      CREATE TABLE Workshops (
        id INT PRIMARY KEY,
        name NVARCHAR(255),
        cityId INT,
        FOREIGN KEY (cityId) REFERENCES Cities(id)
      );
    `;
    await sql.query(createWorkshopsTableQuery);

    // Создание таблицы "Employees"
    const createEmployeesTableQuery = `
      CREATE TABLE Employees (
        id INT PRIMARY KEY,
        name NVARCHAR(255),
        workshopId INT,
        FOREIGN KEY (workshopId) REFERENCES Workshops(id)
      );
    `;
    await sql.query(createEmployeesTableQuery);

    // Вставка данных в таблицу "Cities"
    for (const city of cities) {
      const insertCityQuery = `
        INSERT INTO Cities (id, name)
        VALUES (${city.id}, N'${city.name}')
      `;
      await sql.query(insertCityQuery);
    }

    // Вставка данных в таблицу "Workshops"
    for (const workshop of workshops) {
      const insertWorkshopQuery = `
        INSERT INTO Workshops (id, name, cityId)
        VALUES (${workshop.id}, N'${workshop.name}', ${workshop.cityId})
      `;
      await sql.query(insertWorkshopQuery);
    }

    // Вставка данных в таблицу "Employees"
    for (const employee of employees) {
      const insertEmployeeQuery = `
        INSERT INTO Employees (id, name, workshopId)
        VALUES (${employee.id}, N'${employee.name}', ${employee.workshopId})
      `;
      await sql.query(insertEmployeeQuery);
    }

    console.log(`База данных "${newDatabaseName}" и таблицы созданы, и данные вставлены успешно!`);
  } catch (err) {
    console.error("Ошибка при создании базы данных и таблиц:", err);
  } finally {
    sql.close();
  }
};

createAndFillDatabase();
