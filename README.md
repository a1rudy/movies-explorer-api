#  Дипломный проект: Movies Explorer (Backend).

Ссылка на Backend проекта: [https://api.project-movies-a1rudy.nomoredomains.club](https://api.project-movies-a1rudy.nomoredomains.club)  
Публичный IPv4 сервера: [http://84.252.135.65](http://84.252.135.65)

## Инструкция по развертыванию проекта локально через [Git BASH](https://gitforwindows.org/) (терминал):
1. Скачайте и установите [Node.js с официального сайта](https://nodejs.org/en/download/) (по необходимости).
2. Клонируйте репозиторий в корневую папку командой: 
    `git clone https://github.com/a1rudy/movies-explorer-api.git`
3. Установите node_modules командой: 
    `npm install`
4. Запуститите сервер командой: 
    `npm run start`  
    Запуск сервера с hot-reload: 
    `npm run dev`

## Запросы на стороне backend

### Регистрация

POST http://localhost:3000/signup  
POST https://api.project-movies-a1rudy.nomoredomains.club/signup

В теле запроса передать объект вида

    {
      "name": "Alexey Rudoy",
      "email": "admin@admin.ru",
      "password": "password",
    }

:heavy_check_mark: При успешном запросе в ответе приходит объект пользователя со статусом `200`.

:x: При попытке создать пользователя с уже существующей в базе почтой приходит ответ со статусом `409` и сообщением `Пользователь с таким email уже существует`.

:x: При попытке создать пользователя с некорректными данными приходит ответ со статусом `400` и ошибкой валидации.
  
  
### Авторизация

POST http://localhost:3000/signin  
POST https://api.project-movies-a1rudy.nomoredomains.club/signin
  
В теле запроса передать объект вида

    {
      "email": "admin@admin.ru",
      "password": "password"
    }
  
:heavy_check_mark: При успешном запросе приходит токен пользователя со статусом `200`

:x: При неправильных почте и/или пароле приходит ответ со статусом `401` и сообщением `Неправильные email или пароль`.

### Редактирование информации по пользователе

PATCH http://localhost:3000/users/me  
PATCH https://api.project-movies-a1rudy.nomoredomains.club/users/me

В теле запроса передать объект вида

    {
      "name": "Жак-Ив Кусто",
      "email": "mail@mail.ru"
    }
  
:heavy_check_mark: При успешном запросе в ответе приходит обновлённый объект пользователя со статусом `200`.
  
:x: При попытке создать пользователя с некорректными данными приходит ответ со статусом `400` и ошибкой валидации.

### Отображение данных текущего пользователя

GET http://localhost:3000/users/me  
GET https://api.project-movies-a1rudy.nomoredomains.club/users/me

:heavy_check_mark: При успешном запросе в ответе приходит объект текущего пользователя со статусом `200`.

### Отображение данных всех фильмов

GET http://localhost:3000/movies  
GET https://api.project-movies-a1rudy.nomoredomains.club/movies

:heavy_check_mark: При успешном запросе в ответе приходят объекты с данными всех фильмов со статусом `200`.

### Добавление фильма
  
POST http://localhost:3000/movies  
POST https://api.project-movies-a1rudy.nomoredomains.club/movies

В теле запроса передать объект вида

    {
      "country": "СССР",
      "director": "Владимир Меньшов",
      "duration": 107,
      "year": "1984 год",
      "description": "Ликвидируя неисправность лебедки, Василий Кузякин получил травму и путевку на юг. Там он встретил роковую женщину Раису Захаровну и… вернулся Вася с курорта не к себе в деревню, а в дом Раисы Захаровны. Началась для него новая жизнь, в которой было много непонятного и интересного, но не было дома, где остались Надя, дети и голуби.",
      "image": "https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/683a8796-40fc-4c03-88d8-9e73913ac128/1080x",
      "trailer": "https://www.kinopoisk.ru/film/45146/",
      "nameRU": "Любовь и голуби",
      "nameEN": "Love and Doves",
      "thumbnail": "https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/683a8796-40fc-4c03-88d8-9e73913ac128/1080x",
      "movieId": 1
    }
  
:heavy_check_mark: При успешном запросе в ответе приходит объект фильма со статусом `200`.

:x: При попытке создать похожий фильм приходит ответ со статусом `409` и сообщением `Такой фильм уже существует`.
  
:x: При попытке создать фильм с некорректными данными приходит ответ со статусом `400` и ошибкой валидации.

### Удаление фильма
  
DELETE http://localhost:3000/movies/:_id  
DELETE https://api.project-movies-a1rudy.nomoredomains.club/movies/:_id
  
:heavy_check_mark: При успешном запросе в ответе приходит сообщение `Фильм удален` со статусом `200`.
  
:x: При попытке удалить чужой фильм приходит ответ со статусом `403` и сообщением `Отсутствуют права на уделение фильма`.

:x: При повторной попытке удаления фильма или попытке удалить фильм с несуществующим в базе id приходит ответ со статусом `404` и сообщением `Фильм по указанному id не найден`.

:x: При попытке удалить фильм с некорректным id приходит ответ со статусом `400` и ошибкой валидации.
