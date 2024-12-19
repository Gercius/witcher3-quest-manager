import { manageState } from "./shared/manageState";
import { renderCompletedPercentage } from "../UI/shared/renderStats";

interface QuestInfo {
    id: string;
    name: string;
    isCompleted: boolean;
}

/* 
    EXPORT 
*/
(() => {
    const exportButton = document.querySelector(".export-data-btn");
    if (!exportButton) {
        console.error("Export button not found!");
        return;
    }

    exportButton.addEventListener("click", () => {
        if (window.confirm("Export quest data?")) {
            const data = getQuestData();
            exportQuestData(data, "quest-data.json");
        }
    });

    // Reference https://dev.to/nombrekeff/download-file-from-blob-21ho
    function exportQuestData(blob: Blob, name = "file.txt") {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = blobUrl;
        link.download = name;

        document.body.appendChild(link);

        link.dispatchEvent(
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
            })
        );

        document.body.removeChild(link);
    }

    function getQuestData() {
        const quests: NodeListOf<HTMLElement> = document.querySelectorAll(".quest");
        const data: QuestInfo[] = [];

        quests.forEach((quest) => {
            const id = quest.dataset.id;
            let name = quest.querySelector(".quest-name");
            const isCompleted = quest.querySelector<HTMLInputElement>(".quest-completed input");
            const questInfo: QuestInfo = {
                id: id ? id : "",
                name: name?.textContent ? name.textContent : "",
                isCompleted: isCompleted ? isCompleted.checked : false,
            };
            data.push(questInfo);
        });

        const jsonString = JSON.stringify(data, null, 2);
        const jsonBlob = new Blob([jsonString], { type: "application/json" });

        return jsonBlob;
    }
})();

/* 
    IMPORT
    Reference https://openjavascript.info/2022/12/15/read-a-file-into-javascript-using-filereader/ 
*/

(() => {
    const fileInput = document.querySelector<HTMLInputElement>(".import-quest-data");
    if (!fileInput) {
        console.error("File input not found!");
        return;
    }

    fileInput.addEventListener("change", () => {
        if (fileInput.files && fileInput.files.length > 0) {
            const fr = new FileReader();
            fr.readAsText(fileInput.files[0]);

            fr.addEventListener("load", () => {
                if (window.confirm("Import quest data?")) {
                    try {
                        const data = fr.result;
                        if (typeof data !== "string") {
                            throw new Error("Invalid file content");
                        }

                        const parsedImportData = JSON.parse(data);
                        const questsEl: NodeListOf<HTMLElement> = document.querySelectorAll("tbody tr.quest");

                        parsedImportData.forEach((importObj: QuestInfo) => {
                            for (const questEl of questsEl) {
                                const id = questEl.dataset.id;
                                let isCompletedCheckbox =
                                    questEl.querySelector<HTMLInputElement>(".quest-completed input");

                                if (!isCompletedCheckbox) {
                                    console.error("Checkbox not found!");
                                    return;
                                }

                                if (importObj.id === id) {
                                    isCompletedCheckbox.checked = importObj.isCompleted ? true : false;
                                }
                            }
                        });
                    } catch (error) {
                        alert("Please import correct data");
                    }
                    manageState.save();
                    renderCompletedPercentage();
                } else {
                    fileInput.value = "";
                }
            });
        }
    });
})();
