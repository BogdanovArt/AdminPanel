export const pageMetaData = {
  h1: "Каталог",
  title: "Каталог | Управление сайтом",
  breadcrumbs: [
    {
      url: "/",
      icon: "mdi-home",
      name: "Главная",
    },
    {
      name: "Каталог",
    },
  ],
  pagination: {
    total_pages: 12,
    current_page: 3,
  },
};

export const tableMockData = {
  headers: [
    {
      text: "Наименование",
      align: "left",
      sort: "name",
    },
    {
      text: "Колонка №2",
      align: "left",
      sort: null,
    },
    {
      text: "Действие",
      align: "left",
      sort: null,
    },
  ],
  items: [
    {
      type: "items",
      style: {
        background: "#e5f1f5",
        fontWeight: "600",
      },
      data: [
        {
          type: "name",
          title: "Техника",
          action: {
            url:
              "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/12",
            method: "GET",
            route: "/catalog/12",
          },
          icon: "mdi-folder",
          style: {
            color: "green",
            width: "300px", // "50%"
          },
        },
        {
          type: "controls",
          style: {
            background: "#d5d5ff",
          },
          items: [
            {
              type: "execute",
              title: "Открыть",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/12",
                method: "GET",
                route: "/catalog/12",
              },
              icon: "mdi-folder",
            },
            {
              type: "execute",
              title: "Редактировать",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/update/12",
                method: "GET",
                route: "/catalog/update/12",
              },
              icon: "mdi-pencil",
            },
            {
              type: "execute",
              title: "Удалить",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/delete/confirm/12",
                method: "GET",
              },
              icon: "mdi-delete",
            },
          ],
        },
        {
          type: "controls",
          style: {
            background: "#d5d5ff",
          },
          items: [
            {
              type: "execute",
              title: "Открыть",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/12",
                method: "GET",
                route: "/catalog/12",
              },
              icon: "mdi-folder",
            },
            {
              type: "execute",
              title: "Редактировать",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/update/12",
                method: "GET",
                route: "/catalog/update/12",
              },
              icon: "mdi-pencil",
            },
            {
              type: "execute",
              title: "Удалить",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/delete/confirm/12",
                method: "GET",
              },
              icon: "mdi-delete",
            },
          ],
        },
      ],
    },
    {
      type: "items",
      style: {
        background: "#e5f5ef",
      },
      data: [
        {
          type: "name",
          title: "Удобрения",
          action: {
            url:
              "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/10",
            method: "GET",
            route: "/catalog/10",
          },
          icon: "mdi-folder",
        },
        {
          type: "controls",
          items: [
            {
              type: "execute",
              title: "Открыть",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/10",
                method: "GET",
                route: "/catalog/10",
              },
              icon: "mdi-folder",
            },
            {
              type: "execute",
              title: "Редактировать",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/update/10",
                method: "GET",
                route: "/catalog/update/10",
              },
              icon: "mdi-pencil",
            },
            {
              type: "execute",
              title: "Удалить",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/delete/confirm/10",
                method: "GET",
              },
              icon: "mdi-delete",
            },
          ],
        },
      ],
    },
    {
      type: "items",
      data: [
        {
          type: "name",
          title: "Фрукты",
          action: {
            url:
              "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/1",
            method: "GET",
            route: "/catalog/1",
          },
          icon: "mdi-folder",
        },
        {
          type: "controls",
          items: [
            {
              type: "execute",
              title: "Открыть",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/1",
                method: "GET",
                route: "/catalog/1",
              },
              icon: "mdi-folder",
            },
            {
              type: "execute",
              title: "Редактировать",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/update/1",
                method: "GET",
                route: "/catalog/update/1",
              },
              icon: "mdi-pencil",
            },
            {
              type: "execute",
              title: "Удалить",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/delete/confirm/1",
                method: "GET",
              },
              icon: "mdi-delete",
            },
          ],
        },
      ],
    },
    {
      type: "items",
      data: [
        {
          type: "name",
          title: "Ягоды",
          action: {
            url:
              "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/3",
            method: "GET",
            route: "/catalog/3",
          },
          icon: "mdi-folder",
        },
        {
          type: "controls",
          items: [
            {
              type: "execute",
              title: "Открыть",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/3",
                method: "GET",
                route: "/catalog/3",
              },
              icon: "mdi-folder",
            },
            {
              type: "execute",
              title: "Редактировать",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/update/3",
                method: "GET",
                route: "/catalog/update/3",
              },
              icon: "mdi-pencil",
            },
            {
              type: "execute",
              title: "Удалить",
              action: {
                url:
                  "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/delete/confirm/3",
                method: "GET",
              },
              icon: "mdi-delete",
            },
          ],
        },
      ],
    },
    {
      type: "items",
      data: [
        {
          type: "name",
          title: "Виктор Корнеплод",
          icon: "mdi-account",
        },
        {
          type: "controls",
          items: [
            {
              type: "execute",
              title: "Войти как Виктор",
              icon: "mdi-login",
              action: {
                url: "/api/admin/v1/auth/masterlogin",
                method: "POST",
                data: {
                  id: 23,
                },
              },
            },
          ],
        },
      ],
    },
    {
      type: "button",
      data: [
        {
          type: "name",
          title: "СОЗДАТЬ НОВЫЙ",
          action: {
            url:
              "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/create?",
            method: "GET",
            route: "/catalog/create/",
          },
          icon: "mdi-plus",
        },
      ],
    },
  ],
};
export const tablePageMockData = {
  data: {
    name: "Каталог",
    title: "Каталог",
    type: "static",
    data: {
      type: "table-page",
      table: tableMockData,
    },
  },
  meta: pageMetaData,
};

export const groupControls = [
  {
    type: "execute",
    title: "Удалить",
    action: {
      url:
        "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/content/recommended/3",
      method: "DELETE",
    },
    icon: "mdi-delete",
  },
];

export const formInputGroup = {
  type: "group",
  title: "Информация о разделе",
  controls: groupControls,
  items: [
    {
      type: "text",
      name: "name",
      value: "Винодельная продукция",
      label: "Название раздела",
      disabled: false,
      tooltip: {
        title: "Значение поля задается в учетной системе (1С)",
        icon: "mdi-information",
      },
    },
    {
      type: "checkbox",
      name: "is_active",
      value: null,
      label: "Активность",
      disabled: false,
      rules: "boolean",
      checked: true,
    },
    // {
    //   type: "radio",
    //   name: "category_type",
    //   value: "category",
    //   label: "Тип раздела",
    //   disabled: false,
    //   items: [
    //     {
    //       label: "Раздел",
    //       value: "category",
    //     },
    //     {
    //       label: "Тег",
    //       value: "tag",
    //     }
    //   ],
    // },
    {
      type: "number",
      name: "order-1",
      value: "100",
      rules: "nullable|integer",
      label: "Сортировка",
      disabled: false,
      controls: [
        {
          type: "button",
          dark: true,
          title: "",
          tooltip: "Удалить поле",
          icon: "mdi-close",
          color: "error",
          action: {
            url:
              "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/9?removeField=order-1",
            method: "GET",
          },
        },
      ],
    },
    {
      type: "number",
      name: "order-2",
      value: "200",
      rules: "nullable|integer",
      disabled: false,
      controls: [
        {
          type: "button",
          dark: true,
          title: "",
          tooltip: "Удалить поле",
          icon: "mdi-close",
          color: "error",
          action: {
            url:
              "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/9?removeField=order-2",
            method: "GET",
          },
        },
        {
          type: "button",
          dark: true,
          title: "",
          tooltip: "Добавить поле",
          icon: "mdi-plus",
          color: "primary",
          action: {
            url:
              "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/9?addField=order",
            method: "GET",
          },
        },
      ],
    },
  ],
};
export const formPageMockData = {
  data: {
    name: "Каталог",
    title: "Каталог",
    type: "static",
    data: {
      type: "form-page",
      form: {
        type: "form",
        action: {
          url:
            "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/update/9",
          method: "PATCH",
        },
        items: [
          { ...formInputGroup, title: "Entity 1", id: 1 },
          { ...formInputGroup, title: "Entity 2", id: 2 },
          {
            type: "buttons",
            items: [
              {
                type: "button-submit",
                title: "Сохранить",
                icon: "mdi-content-save",
                action: null,
              },
              {
                type: "button-add",
                title: "Добавить",
                icon: "mdi-plus",
                action: {
                  url:
                    "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/content/recommended/",
                  method: "PUT",
                },
              },
            ],
          },
          {
            type: "button-add",
            title: "Добавить товар",
            icon: "mdi-plus",
            action: {
              url:
                "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/content/recommended/",
              method: "PUT",
            },
          },
        ],
      },
    },
  },
  meta: {
    h1: "Винодельная продукция",
    title: "Винодельная продукция | Управление сайтом",
    breadcrumbs: [
      {
        url: "/",
        icon: "mdi-home",
        name: "Главная",
      },
      {
        url: "/catalog/",
        name: "Каталог",
      },
      {
        name: "Винодельная продукция",
      },
    ],
  },
};

export const formFieldsMockData = [
  {
    type: "text",
    name: "name",
    allowedCharacters: "^[а-яА-Я ]+$",
    value: "Винодельная продукция",
    label: "Название раздела",
    disabled: false,
  },
  {
    type: "checkbox",
    name: "is_active",
    value: null,
    label: "Активность",
    disabled: false,
    rules: "boolean",
    checked: true,
  },
  {
    type: "number",
    name: "order",
    value: "0",
    rules: "nullable|integer",
    label: "Сортировка",
    disabled: false,
  },
];

export const popupMockData = {
  data: {
    type: "popup",
    data: {
      title: "\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435!",
      content:
        '<h3 class="dynamic-form__title" color="red">\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438</h3> <div> <p class="dynamic-form__description"> \u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e? \u042d\u0442\u043e \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043d\u0435\u043e\u0431\u0440\u0430\u0442\u0438\u043c\u043e! </p> </div> ',
      buttons: [
        {
          type: "button",
          title: "\u0414\u0430, \u0423\u0434\u0430\u043b\u0438\u0442\u044c",
          icon: "mdi-check",
          action: {
            url:
              "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog/delete/7",
            method: "DELETE",
          },
          color: "red",
        },
        {
          type: "button",
          title: "\u041d\u0435\u0442",
          icon: "mdi-close",
          action: {
            url:
              "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/catalog?categoryId=7",
            method: "GET",
          },
          color: "green",
        },
      ],
    },
  },
};

export const menuMockData = {
  data: {
    name: "\u041d\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435",
    title: "\u041d\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435",
    header: {
      title:
        "\u0411\u0430\u0437\u0430\u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432.\u0440\u0444",
      link: "/",
      image: {
        url: "https://picsum.photos/40/40",
        name:
          "\u041b\u043e\u0433\u043e\u0442\u0438\u043f \u0411\u0430\u0437\u0430\u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432",
      },
    },
    navPanel: [
      {
        icon: "mdi-home",
        title:
          "\u0414\u043e\u043c\u0430\u0448\u043d\u044f\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430",
        link: "/",
      },
      {
        title: "\u041d\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435",
        icon: "mdi-image-multiple-outline",
        link: "/#content",
        items: [
          {
            title: "\u041e\u0431\u0449\u0435\u0435",
            items: [
              {
                title: "\u041a\u0430\u0440\u0443\u0441\u0435\u043b\u0438",
                link: "/content/slider",
              },
              {
                title: "\u0410\u043a\u0446\u0438\u0438",
                link: "/content/sales",
              },
              {
                title:
                  "\u0411\u043b\u043e\u043a \u201c\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u0442\u043e\u0432\u0430\u0440\u044b\u201d",
                link: "/content/recommended",
              },
            ],
          },
          {
            title:
              "\u041f\u043e\u0441\u0442\u0440\u0430\u043d\u0438\u0447\u043d\u043e\u0435",
            items: [
              {
                title:
                  "\u041a\u043e\u043d\u0442\u0435\u043d\u0442\u043d\u044b\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b",
                link: "/content/pages",
              },
            ],
          },
        ],
      },
      {
        title:
          "\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438",
        icon: "mdi-account-multiple",
        link: "/users",
      },
      {
        title: "\u041a\u0430\u0442\u0430\u043b\u043e\u0433",
        icon: "mdi-cart",
        link: "/catalog",
      },
    ],
  },
};
