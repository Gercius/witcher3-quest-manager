import { getQuestGroups } from "../shared/utils";

export function handleFiltering() {
    const filterBtn = document.querySelector(".filters button");
    const filterOptionsEl = document.querySelector(".filter-options");
    const filterOptionsEls = document.querySelectorAll<HTMLInputElement>(".filter-options li input");

    if (!filterBtn || !filterOptionsEl || !filterOptionsEls) {
        console.error("filterBtn or filterOptionsEl or filterOptionsEls not found!");
        return;
    }

    const typeFiltersMap = {
        main: false,
        side: false,
        contract: false,
        treasure: false,
        scavenger: false,
        gwent: false,
        chance: false,
    };

    let completedFilter = false;

    filterBtn.addEventListener("click", () => {
        filterOptionsEl.classList.toggle("hidden");
    });

    filterOptionsEls.forEach((filterOptionEl) => {
        filterOptionEl.addEventListener("click", (e) => {
            const checkbox = e.target as HTMLInputElement;
            filterQuests(checkbox);
        });

        function filterQuests(checkbox: HTMLInputElement) {
            const filterEnabled = checkbox.checked;
            const filterName = filterOptionEl.name;

            if (filterName !== "completed") {
                typeFiltersMap[filterName as keyof typeof typeFiltersMap] = filterEnabled;
            } else if (filterName === "completed") {
                completedFilter = !completedFilter;
            }

            const quests = getQuestGroups();
            for (const questGroup of quests) {
                const mainRow = questGroup[0];
                const questType = (mainRow as HTMLElement).dataset.type;

                const isQuestCompletedEl = mainRow.querySelector<HTMLInputElement>(".quest-completed input");
                if (!isQuestCompletedEl) {
                    console.log("isQuestCompleted element not found!");
                    return;
                }
                const isQuestCompleted = isQuestCompletedEl.checked;
                const showQuestType = typeFiltersMap[questType as keyof typeof typeFiltersMap];

                // console.log(isQuestCompleted);
                // console.log(showQuestType);

                const typeFilter = Object.values(typeFiltersMap).includes(true);
                // console.log("completedFilter", completedFilter);
                // console.log("TypeFilter", typeFilter);

                // Show all if no iflter is checked
                if (!Object.values(typeFiltersMap).includes(true) && !completedFilter) {
                    questGroup.forEach((questRowEl) => {
                        questRowEl.classList.remove("hidden-filtered", "hidden-filtered-completed");
                    });
                    continue;
                }

                for (const questRowEl of questGroup) {
                    questRowEl.classList.toggle("hidden-filtered-completed", !isQuestCompleted && completedFilter);
                    questRowEl.classList.toggle("hidden-filtered", !showQuestType && typeFilter);
                }
            }
        }
    });
}
