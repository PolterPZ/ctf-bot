import { IBotContext } from "../context/context.interface";
import { Markup, Scenes } from "telegraf";
import { UserModel, teamModel } from "../database/Schema.class";
import { backOption, backboard } from "../markups/after-registration.class";
import { isTextMessage } from "./generaly-utils.functions";

const createTeamMenuWizard = new Scenes.WizardScene<IBotContext>(
  "create-team-wizard",
  async (ctx) => {
    try {
      await ctx.reply("💡 Придумай назву команди", backboard); // lightbulb emoji for idea
      ctx.wizard.next();
    } catch (error) {
      return;
    }
  },
  async (ctx) => {
    try {
      if (isTextMessage(ctx.message)) {
        const name = ctx.message.text.trim();
        console.log(name);
        if (name.length > 30) {
          await ctx.reply(
            "❗ Назва команди має містити в собі до 30 символів. Будь ласка, введіть коректну назву." // warning emoji for length issue
          );
          return ctx.wizard.selectStep(1);
        }

        if (!name) {
          await ctx.reply("⚠️ Будь ласка, введіть коректну спеціальність."); // warning emoji for empty input
          return ctx.wizard.selectStep(1);
        }

        const existingTeam = await teamModel.findOne({ name });
        if (existingTeam) {
          await ctx.reply(
            "🚫 Команда з такою назвою вже існує. Будь ласка, введіть іншу назву." // stop sign emoji for existing team
          );
          return ctx.wizard.selectStep(1);
        }

        ctx.session.teamName = name;
        await ctx.reply("🎉 Звучить потужно!"); // party emoji for encouragement
        await ctx.reply(
          "🔒 Тепер придумай пароль для команди", // lock emoji for password
          Markup.removeKeyboard()
        );
        return ctx.wizard.next();
      }
    } catch (error) {
      return;
    }
  },

  async (ctx) => {
    try {
      if (isTextMessage(ctx.message)) {
        const password = ctx.message.text.trim();

        if (password.length < 8 || password.length > 30 || !password) {
          await ctx.reply(
            "🔑 Пароль повинен містити від 8 до 30 символів. Будь ласка, введіть коректний пароль." // key emoji for password
          );
          // return  ctx.wizard.selectStep(3);
        } else {
          ctx.session.teamPassword = password;
          let user;
          if (ctx.chat) {
            user = await UserModel.findOne({ chatId: ctx.chat.id });
          } else {
            await ctx.reply("⚠️ Невдалося створити команду"); // warning emoji for error
            return ctx.scene.enter("after-registration-menu-wizard");
          }
          if (user) {
            const teamDB = new teamModel({
              name: ctx.session.teamName,
              password: ctx.session.teamPassword,
              members: user?._id,
            });
            user.team = teamDB._id;
            await teamDB.save();
            await user.save();
          } else {
            await ctx.reply("⚠️ Невдалося створити команду"); // warning emoji for error
            return ctx.scene.enter("after-registration-menu-wizard");
          }

          await ctx.reply("🎉 Створення команди завершено!"); // celebration emoji for success
          return ctx.scene.enter("after-registration-menu-wizard");
        }
      } else {
        await ctx.reply("🔒 Придумай пароль для команди"); // lock emoji for password prompt
      }
    } catch (error) {
      return;
    }
  }
);

createTeamMenuWizard.hears(backOption[0], (ctx) => {
  ctx.scene.enter("after-registration-menu-wizard");
});

export default createTeamMenuWizard;
