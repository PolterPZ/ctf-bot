import { Markup, Scenes } from "telegraf";
import { IBotContext } from "../context/context.interface";
import {
  aboutBestText,
  aboutEventText,
  keyboard,
  startMessage,
} from "../sharedText";
import path from "path";
import {
  beforeRegistrationKeyboard,
  beforeRegistrationKeybordText,
} from "../markups/before-registration.markups";
import { isTextMessage } from "../utils/generaly-utils.functions";
import { TimeCheck } from "../utils/timeCheck";

const beforeRegistration = new Scenes.WizardScene<IBotContext>(
  "before-registration",

  async (ctx) => {
    try {
      ctx.replyWithPhoto(
        { source: path.join(__dirname, "../../public/welcome.jpg") },
        {
          caption: startMessage,
          parse_mode: "HTML",
          reply_markup: beforeRegistrationKeyboard.reply_markup,
        }
      );
    } catch (err) {
      return;
    }
  }
);
// beforeRegistration.hears("/start", async (ctx) =>{

// })
beforeRegistration.hears(beforeRegistrationKeybordText[0], async (ctx) => {
  try {
    if (isTextMessage(ctx.message)) {
      await ctx.replyWithPhoto(
        { source: path.join(__dirname, "../../public/best.jpg") },
        {
          caption: aboutBestText,
          reply_markup: keyboard.reply_markup,
          parse_mode: "HTML",
        }
      );
    }
  } catch (err) {
    return;
  }
});

beforeRegistration.hears(beforeRegistrationKeybordText[1], async (ctx) => {
  try {
    if (isTextMessage(ctx.message)) {
      await ctx.replyWithPhoto(
        { source: path.join(__dirname, "../../public/about.jpg") },
        {
          caption: aboutEventText,
          parse_mode: "HTML",
        }
      );
    }
  } catch (err) {
    return;
  }
});
beforeRegistration.hears(beforeRegistrationKeybordText[2], async (ctx) => {
  try {
    if (isTextMessage(ctx.message)) {
      ctx.scene.enter("registration-wizard");
    }
  } catch (err) {
    return;
  }
});
export default beforeRegistration;
