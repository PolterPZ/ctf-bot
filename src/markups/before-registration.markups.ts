import { Markup } from "telegraf";

export const beforeRegistrationKeybordText = [
  "🏢 Про BEST",
  "ℹ️ Про Івент",
  "📝 Реєстрація",
];
export const beforeRegistrationKeyboard = Markup.keyboard([
  [Markup.button.text("ℹ️ Про Івент"), Markup.button.text("🏢 Про BEST")],
  [Markup.button.text("📝 Реєстрація")],
]).resize();
