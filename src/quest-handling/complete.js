export function handleToggleQuestCompletion() {
    const manageState = {
        get: () => {
            const questsEl = document.querySelectorAll("tr.quest");
            const quests = [];
            questsEl.forEach((questEl) => {
                const id = questEl.dataset.id;
                const isCompleted = JSON.parse(localStorage.getItem(id));
                quests.push({ id, isCompleted });

                const checkbox = questEl.querySelector(".quest-completed input");

                if (checkbox) {
                    checkbox.checked = isCompleted;
                }
            });
            return quests;
        },
        save: (targetEl) => {
            const primaryQuestRow = targetEl.closest("tr");
            const isCompleted = targetEl.checked;
            const questStorageKey = primaryQuestRow.dataset.id;
            localStorage.setItem(questStorageKey, isCompleted);
        },
    };
    const table = document.querySelector("table");

    manageState.get();
    renderCompletedPercentage();

    table.addEventListener("click", (e) => {
        if (e.target.matches(".quest-completed input")) {
            manageState.save(e.target);
            renderCompletedPercentage();
        }
    });

    function renderCompletedPercentage() {
        const questsData = manageState.get();
        const totalQuests = questsData.length;
        const totalCompleted = questsData.filter((quest) => quest.isCompleted === true).length;
        const percentege = ((totalCompleted / totalQuests) * 100).toFixed(1);
        const completedHeaderEl = document.querySelector(".completed-percentege");
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
