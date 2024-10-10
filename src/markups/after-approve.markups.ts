import { Markup } from "telegraf";

export const menuOptionAfterApprove = [
  "💼 Вакансії",
  "ℹ️ Більше інформації про CTF",
  "💬 Чат для учасників івенту",
  "👥 Моя команда",
  "🗓️ Дата і місце проведення",
  "🌟 Survival Guide",
];

export const menuKeyboardAfterApprove = Markup.keyboard([
  [
    // Markup.button.callback(menuOptionAfterApprove[0], "menu_vacancies"),
    Markup.button.callback(menuOptionAfterApprove[1], "menu_more-info"),
    Markup.button.callback(menuOptionAfterApprove[2], "menu_chat"),
  ],
  [
    Markup.button.callback(menuOptionAfterApprove[3], "menu_my-team"),
    Markup.button.callback(menuOptionAfterApprove[4], "menu_location"),
  ],
  [Markup.button.callback(menuOptionAfterApprove[5], "menu_survivle-guide")],
]).resize();
