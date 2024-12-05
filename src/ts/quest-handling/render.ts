import { manageState } from "./manageState";

export function renderCompletedPercentage() {
    const questCountEl = document.querySelector(".quest-count");
    const completedHeaderEl = document.querySelector(".completed-percentage");
    if (!completedHeaderEl || !questCountEl) {
        console.error("completedHeaderEl or questCountEl not found!");
        return;
    }

    const questsData = manageState.get();
    const totalQuests = questsData.length;
    const totalCompleted = questsData.filter((quest) => quest.isCompleted === true).length;
    const percentage = ((totalCompleted / totalQuests) * 100).toFixed(1);

    completedHeaderEl.textContent = percentage;
    questCountEl.innerHTML = `${totalCompleted}/${totalQuests}`;
}
