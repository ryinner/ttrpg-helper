export default {
  app: {
    name: "НРИ Помощник",
    description: "Тестовый набросок приложения",
  },
  nav: {
    cardsGenerator: "Генератор карточек",
  },
  form: {
    errors: {
      required: "Поле {name} обязательно для заполнения",
    },
    buttons: {
      apply: "Применить"
    },
    cardsGenerationSettings: {
      width: 'Ширина мм',
      height: 'Длина мм',
      gap: 'Отступ мм',
      padding: 'Внутренний отступ мм'
    }
  },
  tipTap: {
    placeholder: {
      writeTitle: 'Назовите этой карты',
      writeContent: 'Опишите карту'
    }
  }
} as const;
