import { initialQuestData, Quests } from "../../shared/data";

interface QuestTypesMap {
    [key: string]: string;
}

const questTypesMap: QuestTypesMap = {
    MQ: "Main Quest",
    SQ: "Side Quest",
    C: "Contract",
    TH: "Treasure Hunt",
    "G&HP": "Gwent & The Heroes' Pursuit",
    SH: "Scavenger Hunt",
    CE: "Chance Encounter",
};

export function initialTableRender() {
    const tbody = document.querySelector("main table tbody");
    if (!tbody) {
        console.error("Tbody not found!");
        return;
    }

    const data: Quests = initialQuestData;
    for (let i = 0; i < data.length; i++) {
        const quest = data[i];

        // Main quest row
        const parentTr = document.createElement("tr");
        parentTr.setAttribute("data-id", quest.id.toString());
        const questType = quest.questInfo.type.split(" ")[0].toLowerCase();
        parentTr.setAttribute("data-type", questType);
        parentTr.classList.add("quest");
        if (quest.extraDetails.length < 2 || !quest.extraDetails) {
            parentTr.classList.add("last-quest-row");
        }

        // Location
        const locationTd = document.createElement("td");
        locationTd.textContent = quest.location;
        locationTd.classList.add("location");
        locationTd.rowSpan = quest.extraDetails.length || 1;
        parentTr.append(locationTd);

        // Quest
        const nameTd = document.createElement("td");
        nameTd.classList.add("quest-name");

        // Add quest type markers
        for (const questType in questTypesMap) {
            if (quest.questInfo.type === questTypesMap[questType]) {
                nameTd.innerText += `${questType}\n`;
            }
        }

        // Add marker for quests whose order doesn't matter
        if (!quest.questInfo.orderMatters) {
            const questOrderNoMatterImg = document.createElement("img");
            questOrderNoMatterImg.src = "imgs/kekw.jpg";
            questOrderNoMatterImg.alt = 'Risitas kekw meme'
            nameTd.appendChild(questOrderNoMatterImg);
        }

        const questLink = document.createElement("a");
        questLink.classList.add("quest-link");
        questLink.textContent = quest.questInfo.name;
        questLink.setAttribute("href", quest.questInfo.hyperlink);
        questLink.setAttribute("target", "_blank");
        nameTd.append(questLink);
        nameTd.rowSpan = quest.extraDetails.length || 1;
        parentTr.append(nameTd);

        // Quest Completed
        const isCompletedTd = document.createElement("td");
        isCompletedTd.classList.add("quest-completed");
        const isCompletedCheckbox = document.createElement("input");
        isCompletedCheckbox.type = "checkbox";
        isCompletedTd.append(isCompletedCheckbox);
        isCompletedTd.rowSpan = quest.extraDetails.length || 1;
        parentTr.append(isCompletedTd);

        // Add the first extra detail
        if (quest.extraDetails.length) {
            const firstExtraDetailTd = getProperExtraDetail(quest.extraDetails, true);
            parentTr.append(firstExtraDetailTd);
        }
        tbody.append(parentTr);

        // Add additional rows for remaining extra details, if any
        if (quest.extraDetails.length > 1) {
            for (let j = 1; j < quest.extraDetails.length; j++) {
                const lastRow = j === quest.extraDetails.length - 1;

                const extraDetailTr = document.createElement("tr");
                extraDetailTr.setAttribute("data-id", i.toString());
                const extraDetailsTd = getProperExtraDetail(quest.extraDetails, false, j);
                if (lastRow) {
                    extraDetailTr.classList.add("last-quest-row");
                }
                extraDetailTr.append(extraDetailsTd);
                tbody.append(extraDetailTr);
            }
        }
    }

    interface ExtraDetail {
        description: string;
        hyperlink: string;
        isCompleted: boolean;
    }

    // todo - refactor probably
    function getProperExtraDetail(extraDetails: ExtraDetail[], firstDetail = false, index = 0) {
        const extraDetailTd = document.createElement("td");
        extraDetailTd.classList.add("extra-detail");
        if (extraDetails[firstDetail ? 0 : index]?.hyperlink && extraDetails[firstDetail ? 0 : index].description) {
            const extraDetailLink = document.createElement("a");
            extraDetailLink.classList.add("extra-detail-link");
            extraDetailLink.textContent = extraDetails[firstDetail ? 0 : index].description;
            extraDetailLink.setAttribute("href", extraDetails[firstDetail ? 0 : index].hyperlink);
            extraDetailLink.setAttribute("target", "_blank");
            extraDetailTd.append(extraDetailLink);
        } else if (
            extraDetails[firstDetail ? 0 : index]?.hyperlink &&
            !extraDetails[firstDetail ? 0 : index].description
        ) {
            const extraDetailLink = document.createElement("a");
            extraDetailLink.classList.add("extra-detail-link");
            extraDetailLink.textContent = extraDetails[firstDetail ? 0 : index].hyperlink;
            extraDetailLink.setAttribute("href", extraDetails[firstDetail ? 0 : index].hyperlink);
            extraDetailLink.setAttribute("target", "_blank");
            extraDetailTd.append(extraDetailLink);
        } else {
            extraDetailTd.textContent = extraDetails[firstDetail ? 0 : index]?.description;
        }

        return extraDetailTd;
    }
}
