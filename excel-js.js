const ExcelJS = require("exceljs");

// const excelFilePath = "data-no-completion-checks.xlsx";
const excelFilePath = "data.xlsx";

const workbook = new ExcelJS.Workbook();
const quests = [];

let quest = {
    location: "",
    quest: "",
    details: [],
};

workbook.xlsx.readFile(excelFilePath).then(() => {
    const worksheet = workbook.getWorksheet(2); // Access the 2nd sheet
    console.log("Sheet name:", worksheet.name);

    const rows = worksheet.getRows(2, worksheet.rowCount);

    for (let i = 0; i < rows.length; i++) {
        console.log(i);
        const row = rows[i];
        const location = row.getCell(1).value; // Assuming Location is in column 1
        // console.log("value", row.getCell(2).value.text);
        // console.log(row.getCell(2).fill);
        const name = row.getCell(2).value; // Assuming Quest is in column 2
        const details = row.getCell(4).value; // Assuming Quest Details are in column 3

        if (row.getCell(2).value.text === "Kaer Morhen (1)") {
            console.log(row.getCell(2).value);
            console.log(row.getCell(2).fill);
            break;
        }

        if (!quest && details) {
            quest.details.push(details);
            return;
        }

        // If there is a new quest, push the previous quest and start a new one
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

        // console.log(quest);

        // break;
        // if (quests.length > 2) break;
    }

    // Push the last quest if it's valid
    if (quest.quest) {
        quests.push(quest);
    }

    // console.log(quests);

    // worksheet.eachRow((row, rowNumber) => {
    //     if (rowNumber === 1) return; // Skip header row

    //     const location = row.getCell(1).value; // Assuming Location is in column 1
    //     const name = row.getCell(2).value; // Assuming Quest is in column 2
    //     const details = row.getCell(3).value; // Assuming Quest Details are in column 3

    //     if (!quest && details) {
    //         quest.details.push(details);
    //         return;
    //     }

    //     // If there is a new quest, push the previous quest and start a new one
    //     if (quest.quest) {
    //         quests.push(quest);
    //     }

    //     quest = {
    //         location: location || "",
    //         quest: name || "",
    //         details: [],
    //     };

    //     if (details) {
    //         quest.details.push(details);
    //     }

    //     if (quests.length > 10) {
    //         console.log(quests);
    //         return;
    //     }
    // });

    // return;

    // Push the last quest
    // if (quest.location) {
    // quests.push(quest);
    // }
});
