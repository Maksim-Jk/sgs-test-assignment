## Тестовое задание "Младший разработчик ПО"

Этот репозиторий содержит выполненное тестовое задание, состоящее из трех различных задач. Каждая задача представляет собой разные аспекты разработки, включая веб-формы на HTML, JavaScript и Vue.js, а также создание и заполнение базы данных MS SQL. В этом README представлен обзор каждой из задач и ссылки на задания. Подробые инструкции по использованию, описание приложений приведены в ветках заданий.

## Исходные данные для выполнения заданий

1. Создайте web форму, используя Html и JavaScript, со следующими полями ввода:
   - Город – выпадающий список
   - Цех – выпадающий список
   - Сотрудник – выпадающий список
   - Бригада, зависит от времени суток, первая с 8 до 20:00, вторая с 20:00 до 8:00
   - Смена

   Первые три поля зависят друг от друга, т.е. выбрали Город и список Цехов уменьшился.

2. Сделайте подобную форму на Vue.js, с сохранением результата в Cookie.

3. Напишите скрипт по созданию таблицы на MS SQL для данных полей.

## Выполненные задания

Репозиторий состоит из трех веток, каждая из которых представляет собой отдельную задачу:

- **Задание 1 - Web форма на HTML и JavaScript**: В этой задаче разработана веб-форма на HTML и JavaScript, которая позволяет пользователям выбирать город, цех и сотрудника, а также автоматически определять текущее время, бригаду и смену. [Перейти к заданию]([./task1/README.md](https://github.com/Maksim-Jk/sgs-test-assignment/tree/1-form-js)).

- **Задание 2 - Web форма на Vue 3**: Во второй задаче исходная веб-форма была переработана с использованием фреймворка Vue 3 и инструмента сборки Vite. Она также позволяет выбирать город, цех и сотрудника, определять текущее время, бригаду и смену. Дополнительно приложение сохраняет заполненные данные в Cookies . [Перейти к заданию]([./task3/README.md](https://github.com/Maksim-Jk/sgs-test-assignment/tree/2-form-vue)).

- **Задание 3 - Создание и заполнение базы данных MS SQL**: В третьей задаче создается база данных MS SQL и заполняется моковыми данными, используемыми в другой форме. [Перейти к заданию](https://github.com/Maksim-Jk/sgs-test-assignment/tree/3-ms-sql).
