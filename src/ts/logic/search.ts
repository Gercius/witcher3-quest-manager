import { getQuestGroups } from "../shared/utils";

export function handleSearch() {
    const searchInput = document.querySelector(".quest-search input");
    if (!searchInput) {
        console.error("searchInput not found!");
        return;
    }
    let currentQuests: NodeListOf<Element>[] = [];

    searchInput.addEventListener("focus", () => {
        currentQuests = getQuestGroups();
    });

    searchInput.addEventListener("input", (e) => {
        const target = e.target as HTMLInputElement;
        const search = target.value.toLowerCase();

        for (const questGroup of currentQuests) {
            const questNameEl = questGroup[0].querySelector(".quest-name a")!.innerHTML.toLowerCase();
            const questFound = questNameEl.includes(search);
            questGroup.forEach((groupRow) => {
                groupRow.classList.toggle("hidden", !questFound);
            });
        }
    });
}
