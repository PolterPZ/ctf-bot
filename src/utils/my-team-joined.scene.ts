import { IBotContext } from "../context/context.interface";
import { Markup, Scenes } from "telegraf";
import {
  UserModel,
  currentStageModel,
  teamModel,
} from "../database/Schema.class";
import {
  menuKeyboard,
  resumeKeyboard,
  teamCompetitionOption,
  teamProfileAfterApprove,
  teamProfileOption,
  teamProfileboard,
} from "../markups/after-registration.class";
import {
  workingInlineButton,
  workingOption,
} from "../markups/registration.markups";
import * as path from "path";
import { getTeamInfo } from "./get-team-info";
import {
  isTextMessage,
  isDocumentMessage,
  getSceneAndKeyboard,
} from "./generaly-utils.functions";
import { TimeCheck } from "./timeCheck";
import { testOpenText } from "../sharedText";

// let currentSceneKeyboard: any;
// let currentStage: any;

const myTeamJoinedMenuWizard = new Scenes.WizardScene<IBotContext>(
  "my-team-joined-menu-wizard",

  async (ctx) => {
    try {
      const { scene, keyboard } = await getSceneAndKeyboard(ctx);
      ctx.session.currentStage = scene;
      ctx.session.currentSceneKeyboard = keyboard;

      if (ctx.chat) {
        const user = await UserModel.findOne({ chatId: ctx.chat?.id });
        const team = await teamModel.findById(user?.team);
        const teamInfo = await getTeamInfo(team);

        if (ctx.session.currentStage == "after-approve-menu-wizard") {
          await ctx.replyWithPhoto(
            { source: path.join(__dirname, "../../public/team.jpg") },
            {
              caption: teamInfo,
              reply_markup: teamProfileAfterApprove.reply_markup,
            }
          );
        } else if (
          ctx.session.currentStage == "after-registration-menu-wizard"
        ) {
          await ctx.replyWithPhoto(
            { source: path.join(__dirname, "../../public/team.jpg") },
            {
              caption: teamInfo,
              reply_markup: teamProfileboard.reply_markup,
            }
          );
        }
      }
    } catch (error) {
      return;
    }
  },
  //   async (ctx) => {
  //     try {
  //       if (ctx.message) {
  //         let testTask;
  //         const user = await UserModel.findOne({ chatId: ctx.chat?.id });
  //         const team = await teamModel.findById(user?.team);

  //         // Перевірка, чи є повідомлення файлом (наприклад, PDF)
  //         if (isDocumentMessage(ctx.message) && team?.category === "Case Study") {
  //           const fileId = ctx.message.document.file_id;
  //           const fileLink = await ctx.telegram.getFileLink(fileId);
  //           testTask = fileLink.href; // Зберігаємо посилання на файл як testTask
  //         } else if (
  //           isTextMessage(ctx.message) &&
  //           team?.category === "Team Design"
  //         ) {
  //           testTask = ctx.message.text.trim();
  //         } else {
  //           await ctx.reply("Ви відправили некоректний формат, спробуйте ще раз");
  //           return ctx.wizard.selectStep(1);
  //         }

  //         if (team) {
  //           team.testTask = testTask;
  //           await team.save();
  //         } else {
  //           await ctx.reply("Виникла помилка");
  //         }
  //         console.log("fsfd");
  //         return ctx.scene.enter("my-team-joined-menu-wizard");
  //       }
  //     } catch (error) {
  //       return;
  //     }
  //   },
  async (ctx) => {
    try {
      if (isTextMessage(ctx.message)) {
        const listTechnology = ctx.message.text.trim();
        if (ctx.chat) {
          const user = await UserModel.findOne({ chatId: ctx.chat.id });
          const team = await teamModel.findById(user?.team);
          if (team) {
            await team.save(); // Збереження змін в базі даних
          } else {
            await ctx.reply("Виникла помилка");
          }
          return ctx.scene.enter("my-team-joined-menu-wizard");
        }
      }
    } catch (error) {
      return;
    }
  },
  async (ctx) => {
    try {
      if (isTextMessage(ctx.message)) {
        const option = ctx.message.text.trim();
        if (option === workingOption[1]) {
          return ctx.scene.enter("my-team-joined-menu-wizard");
        } else if (option === workingOption[0]) {
          const user = await UserModel.findOne({ chatId: ctx.chat?.id });
          if (user) {
            await teamModel.updateOne(
              { _id: user.team }, // фільтр для вибору команди
              { $pull: { members: user._id } } // видаляємо користувача з масиву members
            );
            user.team = null;
            user.save();
            await ctx.reply("Ви успішно покинули команду");
            return ctx.scene.enter("my-team-menu-wizard");
          } else {
            return ctx.scene.enter("my-team-joined-menu-wizard");
          }
        }
      }
    } catch (error) {
      return;
    }
  }
);

myTeamJoinedMenuWizard.hears(teamProfileOption[0], async (ctx) => {
  return ctx.scene.enter(
    ctx.session.currentStage,
    ctx.session.currentSceneKeyboard
  );
});

// myTeamJoinedMenuWizard.hears(teamProfileOption[1], async (ctx) => {
//     try{
//         await TimeCheck(ctx)
//         if(ctx.session.currentStage !== "after-approve-menu-wizard") {
//             const stage = await currentStageModel.findOne({})

//             if(stage?.isTestReady) {
//                 const user = await UserModel.findOne({ chatId: ctx.chat.id });
//                 const team = await teamModel.findById(user?.team);
//                 if(team?.category === "Team Design") {
//                     await ctx.reply("Введи посилання на ваш проєкт в Tinkercad'i");
//                 }
//                 else if (team?.category === "Case Study") {
//                     await ctx.reply("Завантажте у чат pdf-файл з вашим завданням");
//                 }
//                 ctx.wizard.selectStep(1);
//             }
//             else {
//                 await ctx.reply("Наразі тестового завдання ще нема, очікуйте інформацію в нашому телеграм боті або в інстаграмі.");
//             }

//         }
//     } catch(error) {
//         return;
//     }

// })
// myTeamJoinedMenuWizard.hears(teamProfileOption[2], async (ctx) => {
//   try {
//     await TimeCheck(ctx);
//     if (ctx.session.currentStage !== "after-approve-menu-wizard") {
//       await ctx.reply("Введіть технології якими володіє ваша команда");
//       ctx.wizard.selectStep(2);
//     }
//   } catch (error) {
//     return;
//   }
// });
myTeamJoinedMenuWizard.hears(teamProfileOption[4], async (ctx) => {
  try {
    await TimeCheck(ctx);
    if (ctx.session.currentStage !== "after-approve-menu-wizard") {
      const stage = await currentStageModel.findOne({});

      if (stage?.isTestReady) {
        if (ctx.chat && stage.linkForTest) {
          const inlineKeyboard = [
            [
              {
                text: "Розпочати тестове завдання", // Text for the button
                url: stage.linkForTest, // URL from stage.linkForTest
              },
            ],
          ];

          await ctx.replyWithPhoto(
            { source: path.join(__dirname, "../../public/test.jpg") },
            {
              caption: testOpenText,
              reply_markup: {
                inline_keyboard: inlineKeyboard, // Add the inline keyboard
              },
            }
          );
        }
      } else {
        await ctx.replyWithPhoto(
          { source: path.join(__dirname, "../../public/test.jpg") },
          { caption: "Тестове завдання скоро буде доступне!" }
        );
      }
      ctx.message.text = "";
    }
  } catch (error) {
    return;
  }
});

myTeamJoinedMenuWizard.hears(teamProfileOption[5], async (ctx) => {
  try {
    await TimeCheck(ctx);
    if (ctx.session.currentStage !== "after-approve-menu-wizard") {
      await ctx.reply(
        "Чи точно ви хочете покинути команду?",
        workingInlineButton
      );
      ctx.wizard.selectStep(2);
    }
  } catch (error) {
    return;
  }
});

// myTeamJoinedMenuWizard.hears(teamCompetitionOption[2], async (ctx) => {
//     if(currentStage == "competition-menu-wizard") {
//         await ctx.sendDocument({ source: './public/file_3.pdf' });
//     }
// })
// myTeamJoinedMenuWizard.hears(teamCompetitionOption[1], async (ctx) => {
//   try {
//     await TimeCheck(ctx);
//     if (ctx.session.currentStage == "after-approve-menu-wizard") {
//       let contacts = "Ось вам контакти організаторів:\n";
//       contacts += "Руслан Явір - @ruslan_yavir\n";
//       contacts += "Братюк Владислав - @bratiuk\n";
//       contacts += "Кичма Лілія - @lilaaaaaaaaa\n";

//       await ctx.reply(contacts);
//     }
//   } catch (error) {
//     return;
//   }
// });

myTeamJoinedMenuWizard.hears(teamProfileOption[3], async (ctx) => {
  try {
    await TimeCheck(ctx);

    try {
      await ctx.scene.enter("create-resume-wizard");
    } catch (error) {
      console.error("Помилка під час відправки файлу:", error);
      await ctx.reply("Сталася помилка під час відправки файлу.");
    }
  } catch (error) {
    return;
  }

  // ctx.wizard.selectStep(3);
});

export default myTeamJoinedMenuWizard;
