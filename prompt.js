import inquirer from "inquirer";

const getYear = async () => {
  const question = {
    type: "number",
    name: "year",
    message: "Year? ",
    default: new Date().getFullYear(),
  };
  const answer = await inquirer.prompt([question]);
  return answer.year;
};

const getAlbumlink = async () => {
  const question = {
    type: "string",
    name: "album",
    message: "Album link? ",
  };
  const answer = await inquirer.prompt([question]);
  return answer.album;
};

const ask = async () => {
  const question = {
    type: "list",
    name: "action",
    message: "What is your wish?",
    default: 1,
    choices: [
      { name: "Get albums of a year", value: 1 },
      new inquirer.Separator(),
      { name: "Get album details of a year", value: 2 },
      new inquirer.Separator(),
      { name: "Download albums of a year", value: 3 },
      new inquirer.Separator(),
      { name: "Download album by link", value: 4 },
    ],
  };
  const answer = await inquirer.prompt([question]);
  return answer.action;
};

export { getYear, getAlbumlink, ask };
