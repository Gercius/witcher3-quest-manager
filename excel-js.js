const ExcelJS = require("exceljs");

const excelFilePath = "data.xlsx";

const workbook = new ExcelJS.Workbook();
const quests = [];

let quest = {
    location: "",
    questInfo: {
        name: "",
        hyperlink: "",
        type: "",
        isCompleted: false,
    },
    extraDetails: [
        {
            description: "",
            hyperlink: "",
            isCompleted: false,
        },
    ],
};

workbook.xlsx.readFile(excelFilePath).then(() => {
    const worksheet = workbook.getWorksheet(2);
    console.log("Sheet name:", worksheet.name);

    const rows = worksheet.getRows(2, worksheet.rowCount);

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        const location = row.getCell(1).value;
        console.log(location);

        const questInfo = row.getCell(2).value;
        const questCompleted = row.getCell(3).value;
        const extraDetails = row.getCell(4).value;
        const extraDetailsCompleted = row.getCell(6).value;

        // break;

        // const name = questInfo.text;
        // const hyperlink = questInfo.hyperlink;
        // const questCellFillValue = questInfo.fill.bgColor.argb;
        // const questType = getQuestType(questCellFillValue);

        // console.log(questType);

        // break;

        // const quest = row.getCell(2).value.text;

        // if (!quest && details) {
        //     quest.details.push(details);
        //     continue;
        // }

        // If there is a new quest, push the previous quest and start a new one
        // if (quest.quest) {
        //     quests.push(quest);
        // }

        // quest = {
        //     location: location || "",
        //     quest: name || "",
        //     details: [],
        // };

        // if (details) {
        //     quest.details.push(details);
        // }

        // console.log(quest);

        // break;
        // if (quests.length > 40) break;
    }
});

function toCapitalCase(str) {
    str = str.toLowerCase().split(" ");
    str = str.map((word) => word.slice(0, 1).toUpperCase() + word.slice(1));
    return str.join(" ");
}

function getQuestType(cellFillValue) {
    console.log(cellFillValue);

    const questTypes = {
        FFE06666: "Main Quest",
        FFF6B26B: "Side Quest",
        FFFFD966: "Contract",
        FF93C47D: "Treasure Hunt",
        FFA4C2F4: "Gwent & The Heroes' Pursuit",
        FF3D85C6: "Scavenger Hunt",
        FF8E7CC3: "Chance Encounter",
    };

    return questTypes[cellFillValue];
}
