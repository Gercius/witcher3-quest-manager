import { renderCompletedPercentage } from "../UI/shared/renderStats";
import { hideCompletedQuest } from "./hideCompleted";
import { storage } from "../shared/localStorage";
import { updateTableData } from "../shared/utils";

export function handleToggleQuestCompletion() {
    // initial handling on page load
    updateTableData();
    renderCompletedPercentage();

    // handling on click
    const table = document.querySelector("table");
    if (!table) {
        console.error("Table element not found!");
        return;
    }

    table.addEventListener("click", (e) => {
        const clickedEl = e.target as HTMLElement;
        if (!clickedEl) {
            console.error("Click event not working properly");
            return;
        }

        if (clickedEl.matches(".quest-completed input")) {
            const clickedQuest = clickedEl.closest(".quest") as HTMLInputElement;
            const id = clickedQuest.dataset.id;
            if (typeof id !== "string") {
                console.error("id must be string!");
                return;
            }
            let isCompleted = (clickedEl as HTMLInputElement).checked;
            storage.saveOne(id, isCompleted);
            renderCompletedPercentage();
            if (isCompleted) hideCompletedQuest(id, isCompleted);
        }
    });
}
