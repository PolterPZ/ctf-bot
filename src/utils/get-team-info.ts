import { IBotContext } from "../context/context.interface";
import { UserModel, teamModel } from "../database/Schema.class";

export async function getTeamInfo(team: any): Promise<string> {
  const membersInfo = await getMembersInfo(team);
  let teamInfo = `Інформація про команду ${team?.name}\n\n`;

  teamInfo += `Назва команди: ${team?.name}\n`;

  teamInfo += `Команда допущена до змагань: ${
    team?.isApprove ? "✅" : "❌"
  }\n\n`;
  teamInfo += `Учасники команди:\n${membersInfo}`;

  return teamInfo;
}

async function getMembersInfo(team: any): Promise<string> {
  let membersInfo = "";
  for (const member of team.members) {
    const user = await UserModel.findById(member);
    if (user) {
      if (user.userName) {
        membersInfo += "@" + user.userName;
        membersInfo += ": Наявність резюме - " + (user.cv ? "✅" : "❌") + "\n";
      } else {
        membersInfo += "Учасник без імені";
        membersInfo += ": Наявність резюме - " + (user.cv ? "✅" : "❌") + "\n";
      }
    }
  }
  return membersInfo;
}
