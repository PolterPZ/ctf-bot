import { IBotContext } from "../context/context.interface";
import { Markup, Scenes } from "telegraf";
import {
  infoKeyboard,
  infoOption,
  menuKeyboard,
} from "../markups/after-registration.class";
import moreInfo from "../data/moreInfo.json";
import { menuKeyboardAfterApprove } from "../markups/after-approve.markups";
import { getSceneAndKeyboard } from "./generaly-utils.functions";
import path from "path";
import { TimeCheck } from "./timeCheck";
import {
  aboutBestText,
  aboutEventText,
  additionalAboutEvent,
  keyboard,
  locationText,
  rulesText,
} from "../sharedText";

// let currentSceneKeyboard: any;
// let currentStage: string;

const moreInfoMenuWizard = new Scenes.WizardScene<IBotContext>(
  "more-info-menu-wizard",
  async (ctx) => {
    try {
      const { keyboard, scene } = await getSceneAndKeyboard(ctx);
      ctx.session.currentStage = scene;
      ctx.session.currentSceneKeyboard = keyboard;

      await ctx.replyWithPhoto(
        { source: path.join(__dirname, "../../public/about.jpg") },
        {
          caption: aboutEventText + additionalAboutEvent,
          reply_markup: infoKeyboard.reply_markup,
          parse_mode: "HTML",
        }
      );
    } catch (error) {
      return;
    }
  }
);

moreInfoMenuWizard.hears(infoOption[0], async (ctx) => {
  return ctx.scene.enter(
    ctx.session.currentStage,
    ctx.session.currentSceneKeyboard
  );
});

moreInfoMenuWizard.hears(infoOption[1], async (ctx) => {
  try {
    await TimeCheck(ctx);
    await ctx.reply(moreInfo.categories);
  } catch (error) {
    return;
  }
});
moreInfoMenuWizard.hears(infoOption[2], async (ctx) => {
  try {
    await TimeCheck(ctx);

    await ctx.reply(locationText, { parse_mode: "HTML" });
  } catch (error) {
    return;
  }
});
moreInfoMenuWizard.hears(infoOption[3], async (ctx) => {
  try {
    await TimeCheck(ctx);
    await ctx.replyWithPhoto(
      { source: path.join(__dirname, "../../public/rules.jpg") },
      {
        caption: rulesText,

        parse_mode: "HTML",
      }
    );
  } catch (error) {
    return;
  }
});
moreInfoMenuWizard.hears(infoOption[4], async (ctx) => {
  try {
    await TimeCheck(ctx);

    await ctx.replyWithPhoto(
      { source: path.join(__dirname, "../../public/best.jpg") },
      {
        caption: aboutBestText,
        reply_markup: keyboard.reply_markup,
        parse_mode: "HTML",
      }
    );
  } catch (error) {
    return;
  }
});

export default moreInfoMenuWizard;
