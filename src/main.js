import { questData } from "./data.js";

(function main() {
    populateQuestTable();
    renderQuestCompletion();
})();

function populateQuestTable() {
    const tbody = document.querySelector("main table tbody");
    const quests = questData;

    for (const quest of quests) {
        const parentTr = document.createElement("tr");
        parentTr.classList.add("quest");

        const locationTd = document.createElement("td");
        locationTd.textContent = quest.location;
        locationTd.rowSpan = quest.extraDetails.length || 1;
        parentTr.append(locationTd);

        const nameTd = document.createElement("td");
        nameTd.classList.add("quest-name");
        const questLink = document.createElement("a");
        questLink.classList.add("quest-link");
        questLink.textContent = quest.questInfo.name;
        questLink.setAttribute("href", quest.questInfo.hyperlink);
        nameTd.append(questLink);
        nameTd.rowSpan = quest.extraDetails.length || 1;
        parentTr.append(nameTd);

        const isCompletedTd = document.createElement("td");
        isCompletedTd.classList.add("quest-completed");
        const isCompletedCheckbox = document.createElement("input");
        isCompletedCheckbox.type = "checkbox";
        isCompletedTd.append(isCompletedCheckbox);
        isCompletedTd.rowSpan = quest.extraDetails.length || 1;
        parentTr.append(isCompletedTd);

        // Add the first extra detail (or placeholder if none)
        const firstExtraDetailTd = getProperExtraDetail(quest.extraDetails, true);
        parentTr.append(firstExtraDetailTd);
        tbody.append(parentTr);

        // Add additional rows for remaining extra details, if any
        if (quest.extraDetails.length > 1) {
            for (let i = 1; i < quest.extraDetails.length; i++) {
                const extraDetailTr = document.createElement("tr");
                const extraDetailsTd = getProperExtraDetail(quest.extraDetails, false, i);
                extraDetailTr.append(extraDetailsTd);
                tbody.append(extraDetailTr);
            }
        }
    }

    // todo - refactor probably
    function getProperExtraDetail(extraDetails, firstDetail = false, index) {
        const extraDetailTd = document.createElement("td");
        extraDetailTd.classList.add("extra-detail");
        if (extraDetails[firstDetail ? 0 : index]?.hyperlink && extraDetails[firstDetail ? 0 : index].description) {
            const extraDetailLink = document.createElement("a");
            extraDetailLink.classList.add("extra-detail-link");
            extraDetailLink.textContent = extraDetails[firstDetail ? 0 : index].description;
            extraDetailLink.setAttribute("href", extraDetails[firstDetail ? 0 : index].hyperlink);
            extraDetailTd.append(extraDetailLink);
        } else if (
            extraDetails[firstDetail ? 0 : index]?.hyperlink &&
            !extraDetails[firstDetail ? 0 : index].description
        ) {
            const extraDetailLink = document.createElement("a");
            extraDetailLink.classList.add("extra-detail-link");
            extraDetailLink.textContent = extraDetails[firstDetail ? 0 : index].hyperlink;
            extraDetailLink.setAttribute("href", extraDetails[firstDetail ? 0 : index].hyperlink);
            extraDetailTd.append(extraDetailLink);
        } else {
            extraDetailTd.textContent = extraDetails[firstDetail ? 0 : index]?.description;
        }

        return extraDetailTd;
    }
}

function renderQuestCompletion() {
    const completedEl = document.querySelector(".completed-percentege");
    const table = document.querySelector("table");
    const toggleCompletedCheckboxes = Array.from(document.querySelectorAll(".quest-completed input"));

    calculateQuestsCompleted();

    table.addEventListener("click", (e) => {
        calculateQuestsCompleted();
    });

    function calculateQuestsCompleted() {
        const totalQuests = toggleCompletedCheckboxes.length;
        const totalCompleted = toggleCompletedCheckboxes.filter((checkbox) => checkbox.checked === true).length;
        const percentege = ((totalCompleted / totalQuests) * 100).toFixed(1);
        completedEl.textContent = percentege;
    }

    // function completeAll() {
    //     toggleCompletedCheckboxes.forEach((cb) => {
    //         cb.checked = true;
    //     });

    //     const totalQuests = toggleCompletedCheckboxes.length;
    //     const totalCompleted = toggleCompletedCheckboxes.filter((checkbox) => checkbox.checked === true).length;
    //     const percentege = (totalCompleted / totalQuests) * 100;

    //     console.log(totalQuests);
    //     console.log(completed);
    //     console.log(percentege, "%");
    //     console.log(percentege.toFixed(1), "%");
    // }
}
