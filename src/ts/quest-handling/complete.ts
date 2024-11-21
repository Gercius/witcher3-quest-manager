export function handleToggleQuestCompletion() {
    const manageState = {
        get: () => {
            const questsEl: NodeListOf<HTMLElement> = document.querySelectorAll("tr.quest");

            interface Quest {
                id: string;
                isCompleted: boolean | null;
            }
            const quests: Quest[] = [];
            questsEl.forEach((questEl) => {
                const id = questEl.dataset.id;
                if (typeof id !== "string") {
                    console.error("id must be string!");
                    return;
                }

                const isCompleted = localStorage.getItem(id);
                if (!isCompleted) {
                    console.error("Quest completion state not found!");
                    return;
                }

                const isCompletedd = JSON.parse(isCompleted);
                quests.push({ id: id ? id : "", isCompleted: isCompletedd });

                const checkbox = questEl.querySelector<HTMLInputElement>(".quest-completed input");

                if (checkbox) {
                    checkbox.checked = isCompletedd;
                }
            });
            console.log(quests);

            return quests;
        },
        save: (targetEl: HTMLElement) => {
            const primaryQuestRow = targetEl.closest("tr");
            if (!primaryQuestRow) {
                console.error("Primary quest row element not found!");
                return;
            }

            const isCompleted = (targetEl as HTMLInputElement).checked;
            const questStorageKey = primaryQuestRow.dataset.id;
            if (!questStorageKey || typeof questStorageKey !== "string") {
                console.error("Quest storage key is of incorrect type or not found!");
                return;
            }

            localStorage.setItem(questStorageKey, isCompleted.toString());
        },
    };
    const table = document.querySelector("table");
    if (!table) {
        console.error("Table element not found!");
        return;
    }

    renderCompletedPercentage();

    table.addEventListener("click", (e) => {
        let clickedEl;
        if (e.target) {
            clickedEl = e.target as HTMLElement;
        }

        if (!clickedEl) {
            console.error("Click event not working properly");
            return;
        }

        if (clickedEl.matches(".quest-completed input")) {
            manageState.save(clickedEl);
            renderCompletedPercentage();
        }
    });

    function renderCompletedPercentage() {
        const questsData = manageState.get();
        const totalQuests = questsData.length;
        const totalCompleted = questsData.filter((quest) => quest.isCompleted === true).length;
        const percentege = ((totalCompleted / totalQuests) * 100).toFixed(1);
        const completedHeaderEl = document.querySelector(".completed-percentege");
        if (!completedHeaderEl) {
            console.error("Completed percentage showing element not found!");
            return;
        }
        completedHeaderEl.textContent = percentege;
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
