const XLSX = require("xlsx");

const workbook = XLSX.readFile("data.xlsx");
const sheetName = workbook.SheetNames[1];
const worksheet = workbook.Sheets[sheetName];
const parsedData = XLSX.utils.sheet_to_json(worksheet);

const quests = [];
let quest = {
    location: "",
    quest: "",
    details: [],
};

// let i = 0;
function processQuests() {
    for (const row of parsedData) {
        const location = row["Location"];
        const name = row["Quest"];
        const details = row["Quest Details"];

        if (!quest && details) {
            quest.details.push(details);
            continue;
        }

        // If there is new quest, push the previous quest and start a new one
        if (quest.quest) {
            quests.push(quest);
        }

        quest = {
            location: location || "",
            quest: name || "",
            details: [],
        };

        if (details) {
            quest.details.push(details);
        }

        // i++;
        // if (i >= 20) break;
    }

    // Push last quest
    if (quest.location) {
        quests.push(quest);
    }
    // console.log(quests.length);
}
// processQuests();
