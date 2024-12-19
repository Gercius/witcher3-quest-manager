import { manageState } from "../logic/shared/manageState";

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
    const questInfo = manageState.get();
    const questIds = questInfo.map((quest) => quest.id);
    const questGroupsEl = [];
    for (const questId of questIds) {
        questGroupsEl.push(document.querySelectorAll(`[data-id="${questId}"]`));
    }
    return questGroupsEl;
}
