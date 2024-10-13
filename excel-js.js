const ExcelJS = require("exceljs");

const excelFilePath = "data.xlsx";

const workbook = new ExcelJS.Workbook();
const quests = [];
let quest = null;
let currentQuestName = null;

// let quest = {
//     location: "",
//     questInfo: {
//         name: "",
//         hyperlink: "",
//         type: "",
//         isCompleted: false,
//     },
//     extraDetails: [],
// };

workbook.xlsx.readFile(excelFilePath).then(() => {
    const worksheet = workbook.getWorksheet(2);
    console.log("Sheet name:", worksheet.name);

    const rows = worksheet.getRows(2, worksheet.rowCount);

    for (let i = 0; i < rows.length; i++) {
        console.log("quests.length", quests.length);

        const row = rows[i];
        const locationRaw = row.getCell(1).value;
        const questInfo = row.getCell(2);
        const extraDetails = row.getCell(4).value;

        const questName = questInfo.value.text;
        const questHyperlink = questInfo.value.hyperlink;
        const questCellFillValue = questInfo.fill?.bgColor.argb;
        const questType = questCellFillValue ? getQuestType(questCellFillValue) : "";

        if (currentQuestName && currentQuestName !== questName) {
            // Push the completed quest to the quests array
            quests.push(quest);

            // Start a new quest
            quest = {
                location: toCapitalCase(locationRaw),
                questInfo: {
                    name: questName,
                    hyperlink: questHyperlink,
                    type: questType,
                    isCompleted: false,
                },
                extraDetails: [],
            };
        }

        if (!quest) {
            quest = {
                location: toCapitalCase(locationRaw),
                questInfo: {
                    name: questName,
                    hyperlink: questHyperlink,
                    type: questType,
                    isCompleted: false,
                },
                extraDetails: [],
            };
            currentQuestName = questName;
        }

        if (extraDetails) {
            const extraDetailsDescription = extraDetails.text || extraDetails;
            const extraDetailsHyperlink = extraDetails.hyperlink || "";

            quest.extraDetails.push({
                description: extraDetailsDescription,
                hyperlink: extraDetailsHyperlink,
                isCompleted: false,
            });
        }

        if (i === rows.length - 1) {
            quests.push(quest);
        }

        if (quests.length >= 1) {
            const kekw = JSON.stringify(quests[0], undefined, 2);
            console.log(kekw);

            break;
        }

        currentQuestName = questName;
    }
});

function toCapitalCase(str) {
    str = str.toLowerCase().split(" ");
    str = str.map((word) => word.slice(0, 1).toUpperCase() + word.slice(1));
    return str.join(" ");
}

function getQuestType(cellFillValue) {
    if (!cellFillValue) return "";

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
