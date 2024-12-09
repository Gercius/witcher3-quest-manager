import { manageState } from "./manageState";

export function getQuestGroups() {
    const questInfo = manageState.get();
    const questIds = questInfo.map((quest) => quest.id);
    const questGroupsEl = [];
    for (const questId of questIds) {
        questGroupsEl.push(document.querySelectorAll(`[data-id="${questId}"]`));
    }
    return questGroupsEl;
}
