interface Quest {
    id: string;
    isCompleted: boolean | null;
}

export const manageState = {
    get: () => {
        const questsEl: NodeListOf<HTMLElement> = document.querySelectorAll("tr.quest");

        const quests: Quest[] = [];
        questsEl.forEach((questEl) => {
            const id = questEl.dataset.id;
            if (typeof id !== "string") {
                console.error("id must be string!");
                return;
            }

            const isCompletedUnparsed = localStorage.getItem(id);
            let isCompleted = isCompletedUnparsed === "true" ? true : false;

            quests.push({ id: id ? id : "", isCompleted });

            const checkbox = questEl.querySelector<HTMLInputElement>(".quest-completed input");

            if (checkbox) {
                checkbox.checked = isCompleted;
            }
        });

        return quests;
    },
    save: () => {
        const questsEl: NodeListOf<HTMLElement> = document.querySelectorAll("tr.quest");

        questsEl.forEach((questEl) => {
            const id = questEl.dataset.id;
            if (typeof id !== "string") {
                console.error("id must be string!");
                return;
            }

            const checkbox = questEl.querySelector<HTMLInputElement>(".quest-completed input");
            const isCompleted = checkbox!.checked;
            const questStorageKey = questEl.dataset.id;

            if (!questStorageKey || typeof questStorageKey !== "string") {
                console.error("Quest storage key is of incorrect type or not found!");
                return;
            }
            localStorage.setItem(questStorageKey, isCompleted.toString());
        });
    },
};
