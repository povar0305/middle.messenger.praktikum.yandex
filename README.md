# Чат

* За основу для верстки взяла [макет](https://www.figma.com/file/nMKeQd1eOiWN27uZpuzREb/mukhin-chat?node-id=0%3A1). Единственное, изменила цвета, шрифт и кнопку возврата назад(сделала ее просто отдельно сверху слева)
* Опубликованное [в Netlify приложение](https://sonyaqwerty.netlify.app/)

## Текущий статус
В данной ветке хранится результат работы 2го спринта с [курса](https://practicum.yandex.ru/profile/middle-frontend/)

В рамках данного спринта необходимо было пересобрать основные страницы([авторизация](https://sonyaqwerty.netlify.app/login), [регистрация](https://sonyaqwerty.netlify.app/signin), [страница пользователя](https://sonyaqwerty.netlify.app/profile), [редактирование пользователя](https://sonyaqwerty.netlify.app/update-profile), [404](https://sonyaqwerty.netlify.app/404), [500](https://sonyaqwerty.netlify.app/500) и [заглушка для страницы чата](https://sonyaqwerty.netlify.app/chants)) используя компонентный подход. Реализовать для компонентного подхода класс Block, EventBus. На всех формах реализовать отправку форм в консоль, реализовать валидацию полей по типам.

Так же настроила stylelint, eslint.

Созадала класс Http для работы с апи.

## Установка и запуск

### Установка

Установка зависимостей проекта:

```bash
npm i
```

### Сборка и запуск

```bash
npm run build
```

Проверка на стилистические и типовые ошибки. Используются правила [Airbnb](https://habr.com/ru/articles/417841/).

```bash
npm run lint
```

## Шаблонизатор

В данной ветке представлен шаблонизатор с переиспользуемыми компонентами, с возможностью передавать им определенные параметры.
