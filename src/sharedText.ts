import { Markup } from "telegraf";
import { currentStageModel } from "./database/Schema.class";

export const startMessage = `
Привіт, студенте! 🎓
<b>Цей бот допоможе тобі 💻:</b>
  - Зареєструватися на BEST CTF 📝
  - Розпочати тестове завдання 🧩
  - Знайти необхідну інформацію про CTF, такі як розклад, правила 📜
  - Отримувати сповіщення від організаторів у реальному часі 🛎️
  - Створювати та приєднувати людей до своєї команди 👫
  - Визначити чи ти 0 чи 1 🕵️‍♂️

  <b>Змагання відбуватимуться 16-17 листопада</b> 📆`;
export const keyboard = Markup.inlineKeyboard([
  [
    Markup.button.url(
      "Інстаграм сторінка BEST'у",
      "https://www.instagram.com/best_lviv/ "
    ),

    Markup.button.url("Офіційний сайт BEST'у", "https://best-lviv.org.ua/ua"),
  ],
]);

export const survivleURL = Markup.inlineKeyboard([
  [Markup.button.url("Тик 📝", "https://www.instagram.com/best_lviv/")],
]);
export const testOpenText = `
Ви робите ще один крок вперед, молодці! 🎉
Після того, як ви підтвердите участь, на платформі за посиланням у вас буде 2 години на виконання завдань. ⏳
Готові провести неймовірні декілька годин та вихопити кожен прапорець? 
Залітай ⬇️
`;

export const additionalAboutEvent = `
<b>Завдання будуть із таких категорій:</b> 🧠
- Cryptography 🔐
- Reverse 🔄
- PWN 🛠️
- Forensic 🕵️‍♀️
- OSINT 🔍
- MISC 🎲`;

export const aboutBestText = `
<a href="google.com">BEST Lviv</a> — європейська студентська волонтерська організація з 85 осередками в 30 країнах.

Організація спрямована на розвиток студентів у сф'ері технологій, інженерії та менеджменту.

Наша місія — розвиток студентів 📈, а візія — сила у різноманітті 💪.

Щороку, ми організовуємо близько 4 масштабних івентів, серед яких:
HACKath0n, BEC (Best Engineering Competition), BTW (BEST Training Week) та BCI (Best Company Insight).

Детальніше про ці івенти ви можете дізнатися за посиланнями нижче:`;

export const aboutEventText = `
<u><i>Щоб захищатися, треба вміти атакувати!</i></u> 🛡️

<b>BEST CTF</b> — це командні змагання з кібербезпеки, в яких учасники виконують завдання з різних категорій. Команди повинні знайти "прапорці" 🚩 і заробити за них бали .`;

export const locationText = `
Змагання відбудуться 📅:
<b>16-17 листопада.</b> 
<a href="https://www.google.com/maps">вулиця Федьковича, 57, Львів, Львівська область</a> 📍
Чекаємо тебе! 🚀`;

export const aboutChatText = `
Все ще шукаєш команду? 🤔
Долучайся до нашого чату, де збираються такі ж, як і ти! Тут ти зможеш знайти або створити свою незабутню команду. Не зволікай – <a href='https://t.me/+2gH_DUtVhyY3Njli'>приєднуйся зараз!</a>`;

export const testTaskText = `
Тестове буде доступне згодом! ⏳`;

export const rulesText = `
<u><b>Правила поведінки під час змагань:</b></u> 

1) Забороняється заважати роботі інших учасників, а також зневажливо, агресивно поводитись відносно інших учасників, організаторів та людей, які залучені до івенту.

2) Під час івенту недопустимо перебувати в стані алкогольного спʼяніння.

3) Забороняється псувати майно компанії або використовувати його не за призначенням.

4) Організатори BEST CTF залишають за собою право визначати чи буде учасник продовжувати брати участь в івенті.

5) Під час реєстрації для участі в BEST CTF, учасник погоджується з умовами цих правил та зобов'язується виконувати їх. Невиконання умов цих правил є підставою для дискваліфікації.

6) Організатори BEST CTF не несуть відповідальності за будь-які збитки, пов'язані з івентом.

7) Погоджуючись з правилами, учасники дають згоду на обробку їх персональних даних.
`;

export const BACK = "Назад";
export const aprooveMessage =
  "Вітаємо! 🥸\n\n\nДякуємо за подачу на BEST CTF 2024!\n\nРаді повідомити, що ваша команда пройшла відбір на змагання. Це чудова новина і важливий крок до можливості посісти призове місце на нашому заході! 🥳\n\nНе зупиняйтесь на досягнутому та продовжуйте у тому ж дусі, адже у вас є всі шанси стати переможцем BEST CTF 2024!!\n\n Щоб перейти на новий етап, перезапустіть бота командою /start \n\n\nЗ повагою, організатори BEST CTF 2024! 🚩";
export const notAprooveMessage =
  "Привіт! 👋 \n\n\nДякуємо вам за вашу подачу на BEST CTF 2024\n\nНа жаль, ваша команда не пройшла відбір на змагання. Не засмучуйтесь, це лише один з кроків на вашому шляху. 😌\n\nНе зупиняйтесь на досягнутому та не втрачайте надії, адже у вас є всі шанси спробувати себе на наступному BEST CTF! Ми впевнені, що ви зможете потрапити на наші змагання!\n\nМи віримо у ваш потенціал і чекаємо вашої участі у майбутніх хакатонах. ☺️\n\n\nЗ повагою, BEST CTF 2024! 🚩";
