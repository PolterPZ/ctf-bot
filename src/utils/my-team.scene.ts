import { IBotContext } from "../context/context.interface";
import { Markup, Scenes } from "telegraf";
import {
  takeOption,
  menuKeyboard,
  backboard,
  takeKeyboard,
} from "../markups/after-registration.class";
import { UserModel } from "../database/Schema.class";
import path from "path";
import { TimeCheck } from "./timeCheck";
import { aboutChatText } from "../sharedText";

const myTeamMenuWizard = new Scenes.WizardScene<IBotContext>(
  "my-team-menu-wizard",
  async (ctx) => {
    try {
      const user = await UserModel.findOne({ chatId: ctx.chat?.id });

      if (!user?.team) {
        await ctx.replyWithPhoto(
          { source: path.join(__dirname, "../../public/team.jpg") },
          {
            caption:
              "Ой! схоже у тебе ще нема команди, не зволікай і приєднюйся!",
            reply_markup: takeKeyboard.reply_markup,
            parse_mode: "HTML",
          }
        );
      } else {
        await ctx.scene.enter("my-team-joined-menu-wizard");
      }
    } catch (error) {
      return;
    }
  }
);

myTeamMenuWizard.hears(takeOption[0], async (ctx) => {
  return ctx.scene.enter("after-registration-menu-wizard");
});
myTeamMenuWizard.hears(takeOption[1], async (ctx) => {
  try {
    await TimeCheck(ctx);
    await ctx.reply(aboutChatText, {
      parse_mode: "HTML",
    });
  } catch (error) {
    return;
  }
});
myTeamMenuWizard.hears(takeOption[2], async (ctx) => {
  await ctx.scene.enter("create-team-wizard");
});
myTeamMenuWizard.hears(takeOption[3], async (ctx) => {
  await ctx.scene.enter("join-team-wizard");
});

export default myTeamMenuWizard;
