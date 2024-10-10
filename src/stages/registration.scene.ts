import { IBotContext } from "../context/context.interface";
import { Markup, Scenes } from "telegraf";
import {
  educationInlineButton,
  courseInlineButton,
  contactInlineButton,
  workingInlineButton,
  requestDataInlineButton,
  whereInlineButton,
  educationOption,
} from "../markups/registration.markups";
import { UserModel } from "../database/Schema.class";
import {
  courseOption,
  whereOption,
  workingOption,
  requestOption,
} from "../markups/registration.markups";
import { isContactMessage } from "../utils/generaly-utils.functions";
import { generatePDF } from "../utils/generate-pdf";
import path from "path";
import { rulesText } from "../sharedText";

function isTextMessage(message: any): message is { text: string } {
  return message && message.text !== undefined;
}
async function handleStart(ctx: any): Promise<boolean> {
  if (ctx.message && ctx.message.text === "/start") {
    await ctx.reply(
      "🔄 Скидання реєстрації та повернення до попередньої сцени..."
    );
    await ctx.scene.leave(); // Exit the current wizard scene
    await ctx.scene.enter("before-registration"); // Switch to the 'before-registration-scene'
    return true; // Indicate that the '/start' command was handled
  }
  return false; // Command was not handled
}

const registrationWizard = new Scenes.WizardScene<IBotContext>(
  "registration-wizard",

  // Step 1
  async (ctx) => {
    try {
      ctx.session.subInfo = ctx.session.subInfo || {};

      await ctx.replyWithPhoto(
        { source: path.join(__dirname, "../../public/registration.jpg") },
        {
          caption:
            "🎉 Вітаю! Ви почали етап реєстрації! Пройшовши її, ви отримаєте можливість створити свою потужну команду та пройти тестове завдання.",
        }
      );
      await ctx.reply("🧑‍💼 Введіть ваш вік:", Markup.removeKeyboard());
      return ctx.wizard.next();
    } catch (error) {
      return;
    }
  },

  // Step 2
  async (ctx) => {
    try {
      if (await handleStart(ctx)) return; // Early return if '/start' was handled

      if (isTextMessage(ctx.message)) {
        const age = parseInt(ctx.message.text);
        if (
          age.toString() !== ctx.message.text ||
          isNaN(age) ||
          age < 16 ||
          age > 100
        ) {
          await ctx.reply(
            "🔢 Будь ласка, введіть коректний вік (від 16 до 100)."
          );
          return;
        }

        await ctx.reply("Поважна цифра 😎");
        await ctx.reply("🎓 Де вчишся?", educationInlineButton);
        return ctx.wizard.next();
      } else {
        await ctx.reply("🔢 Будь ласка, введіть числове значення для віку.");
      }
    } catch (error) {
      return;
    }
  },

  // Step 3
  async (ctx) => {
    try {
      if (await handleStart(ctx)) return; // Early return if '/start' was handled

      if (isTextMessage(ctx.message)) {
        const education = ctx.message.text.trim();
        if (!education) {
          await ctx.reply("🏫 Будь ласка, введіть коректне місце навчання.");
          ctx.wizard.selectStep(ctx.wizard.cursor);
          return;
        }
        if (educationOption[4] === education) {
          await ctx.reply(
            "🚫 На жаль, в нашому івенті участь можуть брати лише студенти.",
            educationInlineButton
          );
          ctx.wizard.selectStep(ctx.wizard.cursor);
          return;
        }
        if (educationOption[5] === education) {
          await ctx.reply("✏️ Тоді впиши мені, де ти вчишся.");
          return;
        }
        ctx.session.subInfo.education = education;
        await ctx.reply(
          "🧑‍💼 На якій спеціальності навчаєшся?",
          Markup.removeKeyboard()
        );
        return ctx.wizard.next();
      } else {
        await ctx.reply("🏫 Будь ласка, введіть ваше місце навчання.");
      }
    } catch (error) {
      return;
    }
  },

  // Step 4
  async (ctx) => {
    try {
      if (await handleStart(ctx)) return; // Early return if '/start' was handled

      if (isTextMessage(ctx.message)) {
        const specialization = ctx.message.text.trim();
        if (!specialization) {
          await ctx.reply("🎓 Будь ласка, введіть коректну спеціальність.");
          return;
        }
        ctx.session.subInfo.specialization = specialization;
        await ctx.reply("🤩 Крутий вибір!");
        await ctx.reply("📚 А на якому курсі зараз?", courseInlineButton);
        return ctx.wizard.next();
      } else {
        await ctx.reply("🎓 На якій спеціальності навчаєшся?");
      }
    } catch (error) {
      return;
    }
  },

  // Step 5
  async (ctx) => {
    try {
      if (await handleStart(ctx)) return; // Early return if '/start' was handled

      if (isTextMessage(ctx.message)) {
        const text = ctx.message.text.trim();
        if (text) {
          if (courseOption[5] === text) {
            await ctx.reply("📅 Тоді впиши мені на якому курсі ти зараз.");
            return;
          }

          ctx.session.subInfo.course = text;
          await ctx.reply(
            "🌟 Звідки дізнався/лась про змагання?",
            whereInlineButton
          );
          return ctx.wizard.next();
        } else {
          await ctx.reply("📅 Будь ласка, виберіть коректний курс.");
        }
      } else {
        await ctx.reply("📅 Виберіть курс із запропонованих варіантів.");
      }
    } catch (error) {
      return;
    }
  },

  // Step 6
  async (ctx) => {
    try {
      if (await handleStart(ctx)) return; // Early return if '/start' was handled

      if (isTextMessage(ctx.message)) {
        const text = ctx.message.text.trim();
        if (text) {
          if (whereOption[3] === text) {
            await ctx.reply(
              "🕵️‍♂️ Тоді впиши мені де ти дізнався/лась про змагання."
            );
            return;
          }

          ctx.session.subInfo.where = text;
          await ctx.reply("🙏 Дякую, що поділився/лась!");
          await ctx.reply(
            "📞 Тепер давай обміняємося контактами",
            contactInlineButton
          );
          return ctx.wizard.next();
        } else {
          await ctx.reply("🕵️‍♂️ Будь ласка, виберіть коректний варіант.");
        }
      } else {
        await ctx.reply("🕵️‍♂️ Введіть звідки дізналися про змагання.");
      }
    } catch (error) {
      return;
    }
  },

  // Step 7
  async (ctx) => {
    try {
      if (await handleStart(ctx)) return; // Early return if '/start' was handled

      if (isContactMessage(ctx.message)) {
        const contact = ctx.message.contact;

        ctx.session.subInfo.phone = contact.phone_number || "";
        await ctx.reply("☎️ Дякую за таке знайомство!");
        await ctx.reply(
          "🔒 Залишилося тільки надати згоду на обробку даних",
          requestDataInlineButton
        );
        return ctx.wizard.next();
      } else {
        await ctx.reply("❌ Контакт не отримано.");
      }
    } catch (error) {
      return;
    }
  },

  // Step 8
  async (ctx) => {
    try {
      if (await handleStart(ctx)) return; // Early return if '/start' was handled

      if (
        isTextMessage(ctx.message) &&
        requestOption.includes(ctx.message.text)
      ) {
        ctx.session.isRegistered = true;
        const user = await UserModel.findOne({ chatId: ctx.chat?.id });
        if (user) {
          Object.assign(user, { ...ctx.session });
          await user.save();
        } else {
          const user = new UserModel({ ...ctx.session });
          await user.save();
        }

        await ctx.replyWithPhoto(
          { source: path.join(__dirname, "../../public/start.jpg") },
          {
            caption: `
Вітаю із завершенням реєстрації! 🎉
<b>Тепер ти зможеш:</b>
      - Знайти команду
      - Сформувати команду
      - Пройти тестове завдання
      - Зайти в чат, де будуть всі учасники
      - Отримати всю інформацію про змагання
      <u><b>Та багато іншого!</b></u>`,
            parse_mode: "HTML",
          }
        );

        await ctx.scene.enter("after-registration-menu-wizard");
      } else {
        await ctx.reply(
          "✅ Будь ласка, виберіть опцію для завершення реєстрації."
        );
      }
    } catch (error) {
      return;
    }
  }
);

export default registrationWizard;
