import { Markup } from "telegraf";

export const menuOption = [
  "💼 Вакансії",
  "ℹ️ Більше інформації про CTF",
  "👥 Моя команда",
];

export const menuKeyboard = Markup.keyboard([
  [
    // Markup.button.callback(menuOption[0], "menu_vacancies"),
    Markup.button.callback(menuOption[1], "menu_more-info"),
  ],
  [
    Markup.button.callback(menuOption[2], "menu_my-team"),
    // Markup.button.callback(menuOption[3], "menu_take-part"),
  ],
]).resize();

export const infoOption = [
  "🔙 Назад",
  "📂 Категорії",
  "📅 Дата і місце проведення",
  "📜 Правила на івенті",
  "🧑‍💼 Організатори",
];

export const infoKeyboard = Markup.keyboard([
  [
    Markup.button.text(infoOption[4]),
    Markup.button.text(infoOption[3]),
    // Markup.button.text(infoOption[2]), // Markup.button.text(infoOption[1]),
  ],
  [Markup.button.text(infoOption[0])],
]).resize();

export const takeOption = [
  "🔙 Назад",
  "🔍 Знайти команду",
  "🛠️ Створити команду",
  "🤝 Долучитися до команди",
];

export const takeKeyboard = Markup.keyboard([
  [
    Markup.button.callback(takeOption[2], "take_myteam"),
    Markup.button.callback(takeOption[3], "take_join"),
  ],
  [Markup.button.callback(takeOption[1], "take_find")],
  [Markup.button.callback(takeOption[0], "take_back")],
]).resize();

export const backOption = ["Назад"];
export const backboard = Markup.keyboard([backOption]).resize();

export const teamProfileOption = [
  "🔙 Назад",
  "📄 Додати ваше виконане тестове завдання",
  "🔧 Змінити список технологій команди",
  "📑 Моє резюме",
  "📝 Тестове завдання",
  "🚪 Покинути команду",
];

export const teamProfileboard = Markup.keyboard([
  [
    Markup.button.callback(teamProfileOption[4], "team-profile_test-task"),
    Markup.button.callback(teamProfileOption[5], "team-profile_leave"),
  ],
  [Markup.button.callback(teamProfileOption[3], "team-profile_add-резюме")],
  [Markup.button.callback(teamProfileOption[0], "team-profile_back")],
]).resize();
export const teamCompetitionOption = [
  "🔙 Назад",
  "🆘 Команді потрібна допомога",
  "📑 Моє резюме",
];

export const teamProfileAfterApprove = Markup.keyboard([
  [
    Markup.button.text(teamCompetitionOption[0]), // Створюємо звичайну кнопку
  ],
  //   [Markup.button.text(teamCompetitionOption[1])],
  [Markup.button.text(teamCompetitionOption[2])],
]).resize();

export const resumeOption = [
  "📤 Надіслати готове резюме",
  "📝 Створити резюме",
  "👀 Подивитися завантажене резюме",
  "🔙 Назад",
];

export const resumeKeyboard = Markup.keyboard([
  [
    Markup.button.callback(resumeOption[0], "team-profile_backk"),
    // Markup.button.callback(resumeOption[1], "team-profile_help"),
  ],
  [
    // Markup.button.callback(resumeOption[2], "team-profile_add-cv"),
    Markup.button.callback(resumeOption[3], "team-profile_back"),
  ],
]).resize();
