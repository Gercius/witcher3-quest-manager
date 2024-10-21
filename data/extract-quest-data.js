const ExcelJS = require("exceljs");
const fs = require("node:fs");

const excelFilePath = "data/data.xlsx";

const workbook = new ExcelJS.Workbook();
const quests = [];
let quest = null;
let currentQuestName = null;

workbook.xlsx.readFile(excelFilePath).then(() => {
    const worksheet = workbook.getWorksheet(2);
    console.log("Sheet name:", worksheet.name);

    const rows = worksheet.getRows(2, worksheet.rowCount);

    for (let i = 0; i < rows.length; i++) {
        try {
            const row = rows[i];

            // Push last quest
            if (!row.getCell(2).value) {
                quests.push(quest);
                break;
            }

            const locationRaw = row.getCell(1).value;
            const questInfo = row.getCell(2);
            const extraDetails = row.getCell(4).value;

            const questName = questInfo.value.text;
            const questHyperlink = questInfo.value.hyperlink;
            const questCellFillValue = questInfo.fill?.bgColor.argb;
            const questType = questCellFillValue ? getQuestType(questCellFillValue) : "";

            if (currentQuestName && currentQuestName !== questName) {
                quests.push(quest);

                quest = {
                    location: capitalizeLocationStr(locationRaw),
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
                    location: capitalizeLocationStr(locationRaw, questName),
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
                const extraDetailsDescription = handleExtraDetailsRichText(extraDetails);
                const extraDetailsHyperlink = extraDetails.hyperlink || "";

                quest.extraDetails.push({
                    description: extraDetailsDescription,
                    hyperlink: extraDetailsHyperlink,
                    isCompleted: false,
                });
            }

            currentQuestName = questName;
        } catch (error) {
            console.error(error, "\n At row:", i);
        }
    }

    fs.writeFile("quests.json", JSON.stringify(quests, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file", err);
        } else {
            console.log("quests.json has been saved successfully.");
        }
    });

    console.log(quests.length);
});

function capitalizeLocationStr(string) {
    try {
        const exceptions = ["and", "of"];
        let str = string.includes("/") ? string.toLowerCase().split("/") : string.toLowerCase().split(" ");

        str = str.map((word) => {
            if (exceptions.includes(word)) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        return string.includes("/") ? str.join("/") : str.join(" ");
    } catch (error) {
        console.error(error);
    }
}

function handleExtraDetailsRichText(extraDetails) {
    let extraDetailsDescription;

    if (extraDetails?.text?.richText?.length > 1) {
        extraDetailsDescription = extraDetails.text.richText.reduce((string, currRichTextObj) => {
            return string + currRichTextObj.text;
        }, "");
    } else if (extraDetails?.text?.richText) {
        extraDetailsDescription = extraDetails.text.richText;
    } else if (extraDetails?.text) {
        extraDetailsDescription = extraDetails.text;
    } else {
        extraDetailsDescription = extraDetails || "";
    }

    return extraDetailsDescription;
}

function getQuestType(cellFillValue) {
    if (!cellFillValue) return "";

    const questTypesMap = {
        FFE06666: "Main Quest",
        FFF6B26B: "Side Quest",
        FFFFD966: "Contract",
        FF93C47D: "Treasure Hunt",
        FFA4C2F4: "Gwent & The Heroes' Pursuit",
        FF3D85C6: "Scavenger Hunt",
        FF8E7CC3: "Chance Encounter",
    };

    return questTypesMap[cellFillValue];
}
