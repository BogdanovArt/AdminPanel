# Административная панель управления сайтом

Разработано на основе: [Nuxt.js](https://nuxtjs.org/), [typescript](https://www.typescriptlang.org/)

## Содержание

- [Общее описание](#общее-описание)
- [Форматы API](#форматы-api)
- [Страницы Таблиц](#страницы-таблиц)
- [Страницы Форм](#страницы-форм)
- [Модальные Страницы](#модальные-страницы)
- [Примечания](#примечания)

## Общее описание

**Основные концепции приложения:**

- максимально использовать генерацию контента административной панели на основе получаемых с бекенда данных
- обеспечить максимальное "покрытие" функционала, характерного для управления публичным контентом приложения (добавление и редактирование сущностей, их структура отображения и порядок вывода)
- обеспечить возможность управлять структурой и иерархией страниц самого приложения административной панели без необходимости доработок со стороны фронтенда

**Общий принцип работы**

При заходе в приложение (после осуществления авторизации) отправляются запросы на получение данных для генерации главного меню и корневой страницы приложения.
При переходе на дочерние страницы - через общий метод-аггрегатор запросов отправляется запрос на получение данных.
Полученные данные передаются "диспетчеру" контента, роль которого - определять тип контента и производить рендер соответствующих страниц и компонентов. Отрисованный контент может содержать элементы управления, при взаимодействии с которыми снова происходит вызов метода-аггрегатора запросов с новыми параметрами и цикл повторяется.

**Общие динамические данные страниц**

Бекенд имеет возможность управлять следующими данными на **всех** типах страниц

- Заголовок страницы: `meta.h1`
- Title страницы `meta.title`
- Хлебные крошки `meta.breadcrumbs`

## Форматы API

Пример ответа на корневой запрос приложения (**/api/admin/v1/menu**)

#### Корневой запрос

```yml
data:
  name: Наполнение
  title: Наполнение
  header: #Данные для генерации шапки приложения
    title: Базапродуктов.рф
    link: "/"
    image:
      url: "/img/baza.png"
      name: Логотип Базапродуктов
  navPanel: #Данные для генерации основного меню приложения
    - icon: mdi-home
      title: Домашняя страница
      link: "/"
    - title: Наполнение
      icon: mdi-image-multiple-outline
      link: "/#content"
      items:
        - title: Общее
          items:
            - title: Карусели
              link: "/content/slider"
            - title: Акции
              link: "/content/offers"
        - title: Постраничное
          items:
            - title: Запросы на добавление разделов
              link: "/content/category-requests"
        - title: Пользователи
          icon: mdi-account-multiple
          link: "/users"
        - title: Каталог
          icon: mdi-cart
          link: "/catalog"
```

Пример ответа на запрос данных страницы типа "таблица" (**/api/admin/v1/catalog/:slug**)

#### Таблица

```yml
data:
  name: Каталог
  title: Каталог
  type: static
  data:
    type: table
    table:
      headers:
        - text: Наименование
          align: left
          sort: name
        - text: Действие
          align: left
          sort:
      items:
        - type: items
          data:
            - type: name
              title: Яблоки
              action:
                url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/27
                method: GET
                route: "/catalog/27"
              icon: mdi-folder
            - type: controls
              items:
                - type: execute
                  title: Открыть
                  action:
                    url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/27
                    method: GET
                    route: "/catalog/27"
                  icon: mdi-folder
                - type: execute
                  title: Редактировать
                  action:
                    url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/update/27
                    method: GET
                    route: "/catalog/update/27"
                  icon: mdi-pencil
        - type: items
          data:
            - type: name
              title: Апельсины
              action:
                url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/29
                method: GET
                route: "/catalog/29"
              icon: mdi-folder
            - type: controls
              items:
                - type: execute
                  title: Открыть
                  action:
                    url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/29
                    method: GET
                    route: "/catalog/29"
                  icon: mdi-folder
                - type: execute
                  title: Редактировать
                  action:
                    url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/update/29
                    method: GET
                    route: "/catalog/update/29"
                  icon: mdi-pencil
        - type: items
          data:
            - type: name
              title: Груши 232
              action:
                url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/28
                method: GET
                route: "/catalog/28"
              icon: mdi-folder
            - type: controls
              items:
                - type: execute
                  title: Открыть
                  action:
                    url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/28
                    method: GET
                    route: "/catalog/28"
                  icon: mdi-folder
                - type: execute
                  title: Редактировать
                  action:
                    url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/update/28
                    method: GET
                    route: "/catalog/update/28"
                  icon: mdi-pencil
        - type: button
          data:
            - type: name
              title: СОЗДАТЬ
              action:
                url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/create/12
                method: GET
                route: "/catalog/create/12"
              icon: mdi-plus
meta:
  h1: Каталог
  title: Каталог | Управление сайтом
  breadcrumbs:
    - url: "/"
      icon: mdi-home
      name: Главная
    - name: Каталог
```

Пример ответа на запрос данных страницы типа "форма" (**/api/admin/v1/catalog/:slug**)

#### Форма

```yml
data:
  name: Каталог
  title: Каталог
  type: static
  data:
    type: form
    form:
      action:
        url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/update/27
        method: PATCH
      items:
        - type: group
          title: Информация о разделе
          items:
            - type: text
              name: name
              value: Яблоки
              label: Название раздела
              disabled: false
            - type: checkbox
              name: is_active
              value:
              label: Активность
              disabled: false
              rules: boolean
              checked: true
            - type: text
              name: order
              value:
              label: Сортировка
              disabled: false
            - type: image-upload
              name: image
              value:
              label: Изображение для баннера
              disabled: false
              items:
                - type: "image"
                  id: 9
                  url: "/uploads/162133510360a39c3f775c8.jpg"
                  action:
                    method: "DELETE"
                    url: "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/files/image/9"
        - type: buttons
          items:
            - type: button-submit
              title: Сохранить изменения
              icon: mdi-content-save
meta:
  h1: Яблоки
  title: Яблоки | Управление сайтом
  breadcrumbs:
    - url: "/"
      icon: mdi-home
      name: Главная
    - url: "/catalog/"
      name: Каталог
    - name: Яблоки
```

## Универсальные (общие) сущности

#### Универсальное действие

- `Действие` действия для аггрегатора запросов

| поле       | тип    | [unique](#уникальные-значения-параметров) | required | назначение                             |
| ---------- | ------ | ----------------------------------------- | -------- | -------------------------------------- |
| **method** | string | false                                     | true     | метод запроса                          |
| **url**    | string | false                                     | true     | ссылка для запроса                     |
| **route**  | string | false                                     | false    | ссылка для навигации внутри приложения |

#### Базовое изображение

- `Изображение` сущность загруженных изображений

| поле       | тип                                 | [unique](#уникальные-значения-параметров) | required | назначение                        |
| ---------- | ----------------------------------- | ----------------------------------------- | -------- | --------------------------------- |
| **type**   | string                              | false                                     | true     | тип поля ввода                    |
| **id**     | int                                 | true                                      | true     | идентификатор изображения         |
| **url**    | string                              | true                                      | true     | ссылка на изображение             |
| **action** | [Действие](#универсальное-действие) | false                                     | false    | действие для удаления изображения |

#### Кнопка управления

- `Кнопка` основной орган управления

| поле       | тип                                 | [unique](#уникальные-значения-параметров) | required | назначение                                      |
| ---------- | ----------------------------------- | ----------------------------------------- | -------- | ----------------------------------------------- |
| **type**   | string                              | false                                     | true     | тип элемента управления                         |
| **icon**   | string                              | false                                     | true     | наименование [иконки](#иконки) эл-та управления |
| **title**  | string                              | false                                     | false    | текст кнопки (подсказки)                        |
| **action** | [Действие](#универсальное-действие) | false                                     | false    | действие кнопки                                 |

## Страницы Таблиц

В случае, если сервер вернул данные с типом [таблица](#таблица), диспетчер страниц вызовет рендер соответсвующей страницы.
В добавление к общим параметрам, на страницах [табличного типа](#таблица) Бекенд также имеет возможность:

- задавать количество колонок таблицы - `data.data.table.headers`
- задавать ключ параметра сортировки, содержание и выравнивание текста в ячейках шапки таблицы

#### Тело Таблицы

данные таблицы (`data.data.table`)

| поле        | тип                           | [unique](#уникальные-значения-параметров) | required | назначение                     |
| ----------- | ----------------------------- | ----------------------------------------- | -------- | ------------------------------ |
| **headers** | [Ячейка](#ячейка-шапки)[]     | false                                     | false    | массив ячеек шапки таблицы     |
| **items**   | [Строка](#элементы-таблицы)[] | false                                     | false    | массив элементов строк таблицы |

#### Ячейка шапки

элемент шапки таблицы

| поле      | тип                   | [unique](#уникальные-значения-параметров) | required | назначение                               |
| --------- | --------------------- | ----------------------------------------- | -------- | ---------------------------------------- |
| **text**  | string                | false                                     | false    | текстовое содержимое ячейки              |
| **align** | left / right / center | false                                     | false    | направление выравнивания текста ячейки   |
| **sort**  | string                | true                                      | false    | ключ параметра сортировки данных таблицы |

пример:

```yml
- text: Наименование
  align: left
  sort: name
```

### Элементы таблицы

Предусмотрено несколько типов элементов строк таблицы `(data.data.table.items[index])`:

#### Строка данных

- тип `items`
  Выполняет роль основного элемента таблицы (строка с заполненными данными и органами управления)

| поле      | тип                                | [unique](#уникальные-значения-параметров) | required | назначение                                                                                              |
| --------- | ---------------------------------- | ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| **type**  | string                             | false                                     | true     | наименование типа элемента строки таблицы                                                               |
| **style** | object                             | false                                     | false    | объект с набором inline стилей https://v2.vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles |
| **data**  | [Ячейка](#ячейки-строки-таблицы)[] | false                                     | false    | массив эл-в ячеек строки таблицы                                                                        |

пример:

```yml
- type: items
  data:
    - type: name
      title: Груши 232
      action:
        url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/28
        method: GET
        route: "/catalog/28"
      icon: mdi-folder
    - type: controls
      items:
        - type: execute
          title: Открыть
          action:
            url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/28
            method: GET
            route: "/catalog/28"
          icon: mdi-folder
        - type: execute
          title: Редактировать
          action:
            url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/update/28
            method: GET
            route: "/catalog/update/28"
          icon: mdi-pencil
```

#### Кнопка-строка таблицы

- тип `button`
  Выполняет роль органа управления (например, для вызова действия создания сущности таблицы).
  Также эл-ты с типом `button` дублируются в виде кнопок в верхней части страницы (над таблицей справа от поиска)

| поле     | тип                                | [unique](#уникальные-значения-параметров) | required | назначение                                |
| -------- | ---------------------------------- | ----------------------------------------- | -------- | ----------------------------------------- |
| **type** | string                             | false                                     | true     | наименование типа элемента строки таблицы |
| **data** | [Ячейка](#ячейки-строки-таблицы)[] | false                                     | false    | массив эл-в ячеек строки таблицы          |

пример:

```yml
- type: button
  data:
    - type: name
      title: СОЗДАТЬ
      action:
        url: http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/create/12
        method: GET
        route: "/catalog/create/12"
      icon: mdi-plus
```

#### Ячейки строки таблицы

элемент ячейки строки таблицы

- тип `name`

| поле       | тип                                 | [unique](#уникальные-значения-параметров) | required | назначение                                                                                              |
| ---------- | ----------------------------------- | ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| **type**   | string                              | false                                     | true     | тип ячейки таблицы                                                                                      |
| **title**  | string                              | false                                     | false    | текстовое содержимое ячейки таблицы                                                                     |
| **icon**   | string                              | false                                     | true     | наименование [иконки](#иконки) эл-та управления                                                         |
| **action** | [Действие](#универсальное-действие) | false                                     | false    | действие при взаимодействии с ячейкой                                                                   |
| **style**  | object                              | false                                     | false    | объект с набором inline стилей https://v2.vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles |

- тип `controls` - блок управления строки таблицы

| поле      | тип                            | [unique](#уникальные-значения-параметров) | required | назначение                                                                                              |
| --------- | ------------------------------ | ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| **type**  | string                         | false                                     | true     | наименование типа ячейки строки таблицы                                                                 |
| **items** | [Кнопка](#кнопка-управления)[] | false                                     | false    | массив органов управления ячейки                                                                        |
| **style** | object                         | false                                     | false    | объект с набором inline стилей https://v2.vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles |

**Важно!** ячейки таблицы отрисовываются последовательно в порядке их расположения в массиве `data.table.items[index].data` - при отличии кол-ва ячеек строки от кол-ва колонок таблицы вместо отрисовки пустых ячеек эл-ты будут смещены к левому краю таблицы

## Страницы Форм

Данный тип страниц предназначен преимущественно для работы с сущностями (разделы/товары/пользователи и т.д)
Представляет собой набор динамически генерируемых полей ввода.

Основной `action` формы служит для отправки данных формы

Содержимое [формы](#form) (`data.data.form.items`) может включать следующие типы элементов:

#### Элементы управления формой

- тип `buttons` - Набор органов управления страницей формы (аналогичен подобным элементам страницы табличного типа)

| поле      | тип                            | [unique](#уникальные-значения-параметров) | required | назначение                  |
| --------- | ------------------------------ | ----------------------------------------- | -------- | --------------------------- |
| **type**  | string                         | false                                     | true     | тип элемента                |
| **items** | [Кнопка](#кнопка-управления)[] | false                                     | false    | массив элементов управления |

#### Группа полей ввода

- тип `group` - Сгруппированный (с возможностью сворачивания) набор полей ввода

| поле      | тип                    | [unique](#уникальные-значения-параметров) | required | назначение         |
| --------- | ---------------------- | ----------------------------------------- | -------- | ------------------ |
| **type**  | string                 | false                                     | true     | тип элемента       |
| **title** | string                 | false                                     | false    | заголовок группы   |
| **items** | [Инпут](#поля-ввода)[] | false                                     | false    | массив полей ввода |

пример:

```yml
- type: group
  title: Информация о разделе
  items: []
```

#### Поля ввода

Массив элементов полей ввода может содержать следующие типы элементов:

### Текстовое поле

- тип `text`

| поле         | тип     | [unique](#уникальные-значения-параметров) | required | назначение                                               |
| ------------ | ------- | ----------------------------------------- | -------- | -------------------------------------------------------- |
| **type**     | string  | false                                     | true     | тип поля ввода                                           |
| **name**     | string  | true                                      | true     | значение ключа payload'a для запроса сохранения формы    |
| **label**    | string  | false                                     | false    | содержимое лейбла поля                                   |
| **value**    | string  | false                                     | false    | значение поля по-умолчанию (заполненное значение инпута) |
| **disabled** | boolean | false                                     | false    | состояние возможности редактирования значения поля       |

пример:

```yml
- type: text
  name: name
  value: Яблоки
  label: Название раздела
  disabled: false
```

### Чекбокс

- тип `checkbox`

| поле         | тип     | [unique](#уникальные-значения-параметров) | required | назначение                                               |
| ------------ | ------- | ----------------------------------------- | -------- | -------------------------------------------------------- |
| **type**     | string  | false                                     | true     | тип поля ввода                                           |
| **name**     | string  | true                                      | true     | значение ключа payload'a для запроса сохранения формы    |
| **label**    | string  | false                                     | false    | содержимое лейбла поля                                   |
| **checked**  | boolean | false                                     | false    | значение поля по-умолчанию (заполненное значение инпута) |
| **disabled** | boolean | false                                     | false    | состояние возможности редактирования значения поля       |

пример:

```yml
- type: checkbox
  name: is_active
  label: Активность
  disabled: false
  checked: true
```

### Радио

- тип `radio`

| поле         | тип                         | [unique](#уникальные-значения-параметров) | required | назначение                                            |
| ------------ | --------------------------- | ----------------------------------------- | -------- | ----------------------------------------------------- |
| **type**     | string                      | false                                     | true     | тип поля ввода                                        |
| **name**     | string                      | true                                      | true     | значение ключа payload'a для запроса сохранения формы |
| **label**    | string                      | false                                     | false    | содержимое лейбла поля                                |
| **value**    | string                      | false                                     | true     | значение поля по-умолчанию                            |
| **disabled** | boolean                     | false                                     | false    | состояние возможности редактирования значения поля    |
| **items**    | [Элемент](#элемент-радио)[] | false                                     | true     | возможные варианты выбора для поля                    |

#### Элемент радио

- `radio-item` сущность элемента выбора радио

| поле      | тип    | [unique](#уникальные-значения-параметров) | required | назначение                                 |
| --------- | ------ | ----------------------------------------- | -------- | ------------------------------------------ |
| **value** | string | true                                      | true     | значение, передаваемое при выборе варианта |
| **label** | string | false                                     | true     | отображаемое имя варианта                  |

пример:

```yml
- type: radio
  name: category_type
  label: Тип раздела
  disabled: false
  value: tag
  items:
  - label: Тег
    value: tag
  - label: Раздел
    value: category
```

### Загрузчик изображений

При перетаскивании или ручной загрузке изображения выполняется запрос на image.endpoint (по-умолчанию `/api/admin/v1/files/image`) ответ на который содержит данные загруженного [Изображения](#базовое-изображение)[].

Имеется возможность управлять порядком отображения изображений путем их перетаскивания в рамках текущего поля ввода (изменяется порядок элементов массива идентификаторов изображений в payload'e сохранения формы)

- тип `image-upload`

| поле          | тип                                   | [unique](#уникальные-значения-параметров) | required | назначение                                                                  |
| ------------- | ------------------------------------- | ----------------------------------------- | -------- | --------------------------------------------------------------------------- |
| **type**      | string                                | false                                     | true     | тип поля ввода                                                              |
| **name**      | string                                | true                                      | true     | значение ключа payload'a для запроса сохранения формы                       |
| **endpoint**  | string                                | false                                     | true     | адрес эндпоинта для отправки запросов загрузки / удаления изображений       |
| **label**     | string                                | false                                     | false    | содержимое лейбла поля                                                      |
| **items**     | [Изображение](#базовое-изображение)[] | false                                     | false    | массив сущностей [Изображение](#базовое-изображение)                        |
| **maxCount**  | number                                | false                                     | false    | максимальное кол-во изображений для загрузки                                |
| **minSize**   | float                                 | false                                     | false    | минимальный размер изображения в мегабайтах (дробные значения для килобайт) |
| **maxSize**   | float                                 | false                                     | true     | максимальный размер изображения в мегабайтах                                |
| **maxWidth**  | number                                | false                                     | true     | макс. ширина изображения в пикселах                                         |
| **maxHeight** | number                                | false                                     | true     | макс. высота изображения в пикселах                                         |
| **minWidth**  | number                                | false                                     | true     | мин. ширина изображения в пикселах                                          |
| **minHeight** | number                                | false                                     | true     | мин. высота изображения в пикселах                                          |
| **formats**   | string[]                              | false                                     | true     | массив допустимых форматов изображения вида "image/png", "image/jpg" и т.д. |

#### Базовое изображение

- `Изображение` сущность загруженных изображений

| поле       | тип                                 | [unique](#уникальные-значения-параметров) | required | назначение                        |
| ---------- | ----------------------------------- | ----------------------------------------- | -------- | --------------------------------- |
| **type**   | string                              | false                                     | true     | тип поля ввода                    |
| **id**     | int                                 | true                                      | true     | идентификатор изображения         |
| **url**    | string                              | true                                      | true     | ссылка на изображение             |
| **action** | [Действие](#универсальное-действие) | false                                     | false    | действие для удаления изображения |

пример:

```yml
- type: image-upload
  name: image
  label: Изображение для баннера
  items:
    - type: "image"
      id: 9
      url: "/uploads/162133510360a39c3f775c8.jpg"
      action:
        method: "DELETE"
        url: "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/files/image/9"
```

### Выпадающий список

- тип `dropdown`

| поле               | тип                                      | [unique](#уникальные-значения-параметров) | required | назначение                                                             |
| ------------------ | ---------------------------------------- | ----------------------------------------- | -------- | ---------------------------------------------------------------------- |
| **type**           | string                                   | false                                     | true     | тип поля ввода                                                         |
| **name**           | string                                   | true                                      | true     | значение ключа payload'a для запроса сохранения формы                  |
| **label**          | string                                   | false                                     | false    | содержимое лейбла поля                                                 |
| **placeholder**    | string                                   | false                                     | false    | текст подсказки внутри поля ввода                                      |
| **endpoint**       | string                                   | false                                     | false    | адрес для динамических запросов (добавление, дозагрузка, поиск и т.д.) |
| **enableAddition** | boolean                                  | false                                     | false    | возможность добавления элемента выпадающего списка                     |
| **selectMultiple** | boolean                                  | false                                     | false    | возможность выбирать несколько эл-в списка                             |
| **listItems**      | [Элемент](#элемент-выпадающего-списка)[] | false                                     | false    | массив элементов списка                                                |
| **listSelected**   | [Элемент](#элемент-выпадающего-списка)[] | false                                     | false    | массив выбранных элементов (значение поля по-умолчанию)                |

### Элемент выпадающего списка

| поле      | тип          | [unique](#уникальные-значения-параметров) | required | назначение             |
| --------- | ------------ | ----------------------------------------- | -------- | ---------------------- |
| **id**    | number (int) | true                                      | true     | идентификатор значения |
| **title** | string       | false                                     | true     | наименование значения  |

пример:

```yml
- enableAddition: true
  endpoint: "http://mtk-btb.test.local/api/admin/v1/products/67297/properties/appointment"
  label: "Назначение (помещение)"
  listItems:
    - id: 1776
      title: "Балкон"
    - id: 5658
      title: "Ванная"
    - id: 1777
      title: "Гостиная"
    - id: 1778
      title: "Детская"
    - id: 1782
      title: "Коридор"
    - id: 1779
      title: "Кухня"
    - id: 1780
      title: "Офис"
    - id: 1781
      title: "Прихожая"
    - id: 1783
      title: "Спальня"
  listSelected:
    - id: 1778
      title: "Детская"
    - id: 1782
      title: "Коридор"
  name: "property:appointment"
  placeholder: "Введите характеристику"
  selectMultiple: true
  type: "dropdown"
```

## Модальные Страницы

Страницы типа "таблица" и "форма" имеют возможность открываться в двух контекстах - в "модальном" и "статичном".
Если в ответе сервера в качестве типа поля `data.type` будет указано значение `modal` - следующая загруженная страница будет отображена в "модальном" контексте. Последниее действие, совершенное в "статичном" контексте при этом сохранится. При навигации "внутри" страницы в "модальном" контексте - новый контент будет отображаться в данном контексте до тех пор, пока поле `data.type` будет иметь соответвующий тип (`modal`). История переходов в браузере будет также сохраняться, путь в адресной строке также будет модифицироваться. Как только от сервера будет получен контент со "статичным" типом, модальное окно закроется, навигация продолжится в "статичном" контексте. При принудительном закрытии модального окна будет выполнено последнее сохраненное в "статичном" контексте действие.

## Поп-ап окна

Также имеется возможность показывать сообщения / подтверждения пользователям в поп-ап контексте.
Для этого также в поле `data.type` указывается соответствующий тип `popup`.

- тип `popup`

| поле     | тип                        | [unique](#уникальные-значения-параметров) | required | назначение          |
| -------- | -------------------------- | ----------------------------------------- | -------- | ------------------- |
| **type** | string                     | false                                     | true     | тип контекста       |
| **data** | [Контент](#контент-поп-ап) | false                                     | true     | контент поп-ап окна |

### Контент поп-ап

| поле        | тип                             | [unique](#уникальные-значения-параметров) | required | назначение                                                |
| ----------- | ------------------------------- | ----------------------------------------- | -------- | --------------------------------------------------------- |
| **title**   | string                          | false                                     | false    | заголовок поп-ап окна                                     |
| **content** | string (html)                   | false                                     | false    | тело сообщения пользователю (может принимать html шаблон) |
| **buttons** | [Кнопка](#кнопка-поп-ап-окна)[] | false                                     | true     | массив сущностей [Кнопка](#кнопка-поп-ап-окна)            |

### Кнопка поп-ап окна

| поле       | тип                                 | [unique](#уникальные-значения-параметров) | required | назначение                     |
| ---------- | ----------------------------------- | ----------------------------------------- | -------- | ------------------------------ |
| **title**  | string                              | false                                     | false    | тектовое содержимое кнопки     |
| **action** | [Действие](#универсальное-действие) | false                                     | true     | действие кнопки                |
| **dark**   | boolean                             | false                                     | false    | вариант исполнения кнопки      |
| **icon**   | string                              | false                                     | false    | наименование [иконки](#иконки) |
| **color**  | string                              | false                                     | false    | цвет кнопки                    |

пример:

```yml
- type: popup
  data:
    title: Внимание!
    content: '
      <h3 class="dynamic-form__title" color="red">Удаление категории</h3>
      <div>
        <p class="dynamic-form__description">
          Вы уверены, что хотите удалить категорию?
          Это действие необратимо!
        </p>
      </div>
    '
    buttons:
      - title: "Да, Удалить"
        icon: "mdi-check"
        color: "red"
        action:
          method: GET
          url:
            "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/delete/12"
      - title: "Нет, чёрт попутал"
        icon: "mdi-close"
        color: "green"
        action:
          method: GET
          url:
            "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/"
```

## Примечания

#### иконки

Чтобы выбрать необходимую иконку, можно воспользоваться сервисом https://materialdesignicons.com/.
Выбрать подходящую иконку от Google (без оранжевой рамки), и добавить к ее названию "mdi-". (Например, чтобы использовать иконку с названием account, в поле icon нужно передать "mdi-account").

#### уникальные значения параметров

Уникальность значения среди родственных сущностей. Например среди всех полей ввода формы, или всех товаров в списке вне зависимости от иерархии вывода этих элементов в JSON-дереве.
