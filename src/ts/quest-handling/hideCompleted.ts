export function handleHideCompleted() {
    const hideQuestsBtn = document.querySelector<HTMLInputElement>(".hide-quests input");
    if (!hideQuestsBtn) {
        console.error("hideQuestsBtn not found!");
        return;
    }

    const storageKey = "hide-quests";
    const hideQuestsUnparsed = localStorage.getItem(storageKey);
    let hideQuests = hideQuestsUnparsed === "true" ? true : false;
    hideQuestsBtn.checked = hideQuests;
    hideCompletedQuests(hideQuests);

    hideQuestsBtn.addEventListener("click", () => {
        const isToggledHideQuests = hideQuestsBtn.checked;
        localStorage.setItem(storageKey, `${isToggledHideQuests ? "true" : "false"}`);
        hideCompletedQuests(isToggledHideQuests);
    });

    function hideCompletedQuests(hide: boolean) {
        const questsEl: NodeListOf<HTMLElement> = document.querySelectorAll("tbody .quest");
        questsEl.forEach((questEl) => {
            const isQuestCompletedEl = questEl.querySelector<HTMLInputElement>(".quest-completed input");
            if (!isQuestCompletedEl) {
                console.error("isCompletedEl not found!");
                return;
            }

            const isQuestCompleted = isQuestCompletedEl.checked;
            const questId = questEl.dataset.id;
            const questTableRows: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-id="${questId}"]`);
            questTableRows.forEach((rowEl) => {
                if (isQuestCompleted) rowEl.classList.toggle("hidden-completed", hide);
            });
        });
    }
}

export function hideCompletedQuest(questCompletedCheckbox: HTMLElement) {
    const hideQuestsBtn = document.querySelector<HTMLInputElement>(".hide-quests input");
    if (!hideQuestsBtn) {
        console.error("hideQuestsBtn not found!");
        return;
    }
    if (!hideQuestsBtn.checked) return;

    const questCompletedInput = questCompletedCheckbox as HTMLInputElement;
    const questEl = questCompletedCheckbox.parentElement!.parentElement;
    if (!questEl) {
        console.log("questEl not found!");
        return;
    }

    const questId = questEl.dataset.id;
    const isQuestCompleted = questCompletedInput.checked;

    const questTableRows: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-id="${questId}"]`);
    questTableRows.forEach((rowEl) => {
        if (isQuestCompleted) {
            rowEl.classList.toggle("hidden-completed");
        }
    });
}
