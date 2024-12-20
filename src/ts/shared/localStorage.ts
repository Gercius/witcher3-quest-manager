import { questIds, WorkingData, workingData } from "./data";

export const storage = {
    init: () => {
        const firstQuest = localStorage.getItem("0");
        if (!firstQuest && firstQuest !== "Kaer Morhen (1)") {
            for (const quest of workingData) {
                localStorage.setItem(quest.id.toString(), JSON.stringify(quest));
            }
        }
    },
    getOne: (id: string | number) => {
        return localStorage.getItem(id.toString());
    },
    getAll: function () {
        let quests: WorkingData[] = [];
        for (const id of questIds) {
            const unparsedQuest = localStorage.getItem(id.toString());
            const quest = unparsedQuest ? JSON.parse(unparsedQuest) : null;
            quests.push(quest);
        }
        return quests;
    },
    saveOne: function (id: string | number, completed: boolean) {
        const unparsedQuest = this.getOne(id);
        if (unparsedQuest) {
            const quest = JSON.parse(unparsedQuest);
            quest.isCompleted = completed;
            localStorage.setItem(id.toString(), JSON.stringify(quest));
        }
    },
    saveAll: function () {
        const quests = this.getAll();
        for (const quest of quests) {
            const questCompletedCheckbox = document.querySelector(
                `[data-id="${quest.id}"] .quest-completed input`
            ) as HTMLInputElement;
            quest.isCompleted = questCompletedCheckbox.checked;
            localStorage.setItem(quest.id.toString(), JSON.stringify(quest));
        }
    },
};
