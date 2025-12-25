## randombot

> Примечание: изначально проект был разработан для экспериментов с inline-запросами к Telegram-ботам. Представленная реализация входит в roadmap изучения Node.js фреймворка NestJS

## Что это?

**Проект представляет из себя:**
* Telegram-бота, выполняющего [inline-запросы](https://core.telegram.org/bots/features#inline-requests) для случайного выбора ответа (да/нет) на вопрос пользователя
* Панель управления, имеющая возможность включения/отключения бота, а также добавления/удаления пользователей с дополнительным функционалом

**Дополнительный функционал** – предопределение «случайного» выбора и скрытие/отображение этой возможности (см. [приложение](#images))

## Технологический стек

| | Изначальный | Текущий |
|:-|:-|:-|
| **Платформа** | Node.js | Node.js + NestJS |
| **Язык** | JavaScript | TypeScript |
| **API** | Express.js | NestJS |
| **Хранилище** | JSON-файл | MySQL |
| **Драйвер хранилища** | fs | mysql2 |
| **ORM** | — | TypeORM |
| **Библиотека бота** | Telegraf | Модуль nestjs-telegraf |
| **Управление<br>состоянием бота** | PM2-процесс | Программное |
| **Frontend** | SPA (HTML,CSS, JS) | MPA (HTML,CSS,JS) |

## Развёртывание

**Требования**
* Node.js (+пакетный менеджер)
* Docker

**Инструкция**
1. Клонируйте репозиторий
2. Установите зависимости (рекомендуется использовать pnpm)
```
pnpm install
```
 или
```
npm install
```
3. Создайте .env файл
```
PANEL_PASSWORD=your-panel-password
BOT_TOKEN=your-telegram-bot-toker
```
4. Соберите и запустите Docker-контейнер, используя docker-compose.yml и init.sql файлы (образ mysql загрузится автоматически, если его ещё нет)
```
docker-compose up -d
```
5. Запустите приложение
```
nest start
```

<h2 id="images">Приложение</h2>

#### Демонстрация работы бота

<div align="left">
  <img src="/readmeImg/start-help.png" width="300" alt=""/>
  <img src="/readmeImg/yes-no.png" width="300" alt=""/>
</div>
<div align="left">
   <img src="/readmeImg/query.png" width="300" alt=""/>
  <img src="/readmeImg/admin.png" width="300" alt=""/>
</div>

#### Панель управления

<div align="left">
  <img src="/readmeImg/auth.png" width="300" alt=""/>
  <img src="/readmeImg/panel.png" width="300" alt=""/>
</div>
