import { manageState } from "./manageState";

export function renderCompletedPercentage() {
    const questsData = manageState.get();
    const totalQuests = questsData.length;
    const totalCompleted = questsData.filter((quest) => quest.isCompleted === true).length;
    const percentage = ((totalCompleted / totalQuests) * 100).toFixed(1);
    const completedHeaderEl = document.querySelector(".completed-percentage");
    if (!completedHeaderEl) {
        console.error("Completed percentage showing element not found!");
        return;
    }
    completedHeaderEl.textContent = percentage;
}
