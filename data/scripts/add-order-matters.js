const fs = require("fs");
let questsData = require("../quests-copy.json");
const orderMattersData = require("../quest-order-matters.json");

const quests = [];
for (let i = 0; i < questsData.length; i++) {
    if (questsData[i].id === orderMattersData[i].id) {
        quests.push({
            ...questsData[i],
            questInfo: {
                ...questsData[i].questInfo,
                orderMatters: orderMattersData[i].orderMatters,
            },
        });
    }
}

fs.writeFile("./data/order-matters-test.json", JSON.stringify(quests), (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("gg");
    }
});
