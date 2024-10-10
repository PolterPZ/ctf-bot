import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { Telegraf } from "telegraf";
import { UserModel } from "../database/Schema.class";
import { GetCurrentStage } from "../utils/get-current-stage";
import { TimeCheck } from "../utils/timeCheck";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start(async (ctx) => {
      try {
        // ⏰ Time check before proceeding
        await TimeCheck(ctx);
        const currentStage = await GetCurrentStage();

        if (!currentStage) {
          console.log("❗ Не визначено теперішньої секції");
          return;
        }

        let user = await UserModel.findOne({ chatId: ctx.chat.id });

        // If the user does not exist, create a new user
        if (!user) {
          user = new UserModel({ chatId: ctx.chat.id });
          await user.save();
          console.log("🆕 Новий користувач створений");
        }

        // Handle unregistered users
        if (!user.isRegistered) {
          if (currentStage === "after-registration-menu-wizard") {
            ctx.session.chatId = ctx.chat.id;
            if (ctx.from.username) {
              ctx.session.userName = ctx.from.username;
            }
            await ctx.scene.enter("before-registration");
          } else {
            ctx.reply(
              "⏳ На жаль час реєстрації минув, дивіться за останніми новинами про CTF разом з нами 📢"
            );
          }
        } else {
          console.log("✅ Користувач зареєстрований");
          ctx.session.stage = currentStage;
          await ctx.scene.enter(currentStage);
        }
      } catch (error) {
        console.log("⚠️ Сталася помилка:", error);
        return;
      }
    });
  }
}
