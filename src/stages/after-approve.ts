import { IBotContext } from "../context/context.interface";
import { Markup, Scenes } from "telegraf";
import vacancies from "../data/vacancies.json";
import { ConfigService } from "../config/config.service";
import {
  menuKeyboardAfterApprove,
  menuOptionAfterApprove,
} from "../markups/after-approve.markups";
import { UpdateStage } from "../utils/update-stage";
import { GetCurrentStage } from "../utils/get-current-stage";
import { UserModel, teamModel } from "../database/Schema.class";
import path from "path";
import { TimeCheck } from "../utils/timeCheck";
import { isTextMessage } from "../utils/generaly-utils.functions";
import { locationText } from "../sharedText";

const afterApproveMenuWizard = new Scenes.WizardScene<IBotContext>(
  "after-approve-menu-wizard",
  async (ctx) => {
    try {
      UpdateStage(ctx, "after-approve-menu-wizard");
      if (ctx.chat) {
        const user = await UserModel.findOne({ chatId: ctx.chat?.id });
        const team = await teamModel.findById(user?.team);
        if (team && team.isApprove) {
          if ("after-approve-menu-wizard" == (await GetCurrentStage())) {
            await ctx.reply("<b>Вітаємо на BEST Capture The Flag!</b>", {
              reply_markup: menuKeyboardAfterApprove.reply_markup,
              parse_mode: "HTML",
            });
          }
        } else {
          await ctx.reply(
            "На жаль, ваша команда не пройшла цього року на змагання. Дякуємо за участь, кожен учасник зробив свій внесок в цей івент, будемо вас чекати наступного року ❤️‍🔥"
          );
        }
      }
    } catch (error) {
      return;
    }
  }
);

const userLastMessageTime: { [userId: number]: number } = {};

// afterApproveMenuWizard.hears(menuOptionAfterApprove[0], async (ctx) => {
//   const userId = ctx.from.id;
//   const now = Date.now();

//   if (
//     !userLastMessageTime[userId] ||
//     now - userLastMessageTime[userId] > 2000
//   ) {
//     userLastMessageTime[userId] = now;
//   } else {
//     ctx.reply("Забагато спроб виконати команду");
//     return;
//   }

//   await ctx.reply("Доступні вакансії:\n\n");
//   for (const vacancy of vacancies.vacancies) {
//     await ctx.reply(`${vacancy.text}\n`);
//   }
// });
afterApproveMenuWizard.hears(menuOptionAfterApprove[1], async (ctx) => {
  return ctx.scene.enter("more-info-menu-wizard");
});
afterApproveMenuWizard.hears(menuOptionAfterApprove[2], async (ctx) => {
  try {
    await TimeCheck(ctx);
    try {
      if (isTextMessage(ctx.message)) {
        await ctx.replyWithPhoto(
          { source: path.join(__dirname, "../../public/paxChat.jpg") },
          {
            caption:
              "Тут ви зможете отримати багато актуальної інфи та спілкуватися з іншими учасниками та організаторами 👇👇👇",
            reply_markup: Markup.inlineKeyboard([
              Markup.button.url("Тик", "https://t.me/+Jltj5npknsJjOTUy"),
            ]).reply_markup,
            parse_mode: "HTML",
          }
        );
      }
    } catch (err) {
      return;
    }
  } catch (error) {
    return;
  }
});
// afterApproveMenuWizard.hears(menuOptionAfterApprove[3], async (ctx) => {
//     await ctx.reply('Ось посилання на загальну інформацію для учасників, обов\'язково прочитати!',  Markup.inlineKeyboard([
//         Markup.button.url('Тик', 'https://t.me/+r1HLUVqycngxYzZi')
//     ]));
// })
afterApproveMenuWizard.hears(menuOptionAfterApprove[3], async (ctx) => {
  return ctx.scene.enter("my-team-joined-menu-wizard");
});
afterApproveMenuWizard.hears(menuOptionAfterApprove[4], async (ctx) => {
  try {
    if (isTextMessage(ctx.message)) {
      await ctx.replyWithPhoto(
        { source: path.join(__dirname, "../../public/location.jpg") },
        {
          caption: locationText,
          parse_mode: "HTML",
        }
      );
    }
  } catch (err) {
    return;
  }
});
afterApproveMenuWizard.hears(menuOptionAfterApprove[5], async (ctx) => {
  try {
    await ctx.replyWithDocument(
      { source: path.join(__dirname, "../../public/SurvivalGuide.pdf") },
      {
        caption:
          "Обов'язковий до ознайомлення! Тут міститься важлива інформація щодо змагань",

        parse_mode: "HTML",
      }
    );
  } catch (error) {
    return;
  }
});

const adminSecret = new ConfigService().get("ADMIN_WORD");
afterApproveMenuWizard.hears(adminSecret, async (ctx) => {
  return ctx.scene.enter("admin-panel-wizard");
});

// afterApproveMenuWizard.on('text', (ctx) => {
//     const userId = ctx.from.id;
//     const now = Date.now();

//     if (!userLastMessageTime[userId] || (now - userLastMessageTime[userId] > 2000)) {
//         userLastMessageTime[userId] = now;
//     } else {
//         ctx.reply('Забагато спроб виконати команду');
//     }
// });

export default afterApproveMenuWizard;
