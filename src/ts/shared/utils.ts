import { questIds, WorkingData } from "./data";
import { storage } from "./localStorage";

export async function getData() {
    const url = "data/quests.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error((error as Error).message);
    }
}

export function getQuestGroups() {
    const questGroupsEl = [];
    for (const questId of questIds) {
        questGroupsEl.push(document.querySelectorAll(`[data-id="${questId}"]`));
    }
    return questGroupsEl;
}

export function updateTableData() {
    for (const id of questIds) {
        const unparsedQuest = storage.getOne(id.toString());
        const quest: WorkingData = unparsedQuest ? JSON.parse(unparsedQuest) : [];

        const questRowEl = document.querySelector(`.quest[data-id="${id}"]`);
        if (!questRowEl) {
            console.log("questRowEl not found!");
            return;
        }
        const completedCheckbox = questRowEl.querySelector(".quest-completed input") as HTMLInputElement;
        completedCheckbox.checked = quest.isCompleted;
    }
}
