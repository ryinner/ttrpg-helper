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
      gap: 'Отступ мм'
    }
  }
} as const;
