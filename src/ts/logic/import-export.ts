import { workingData, WorkingData } from "../shared/data";
import { storage } from "../shared/localStorage";
import { updateTableData } from "../shared/utils";
import { renderCompletedPercentage } from "../UI/shared/renderStats";

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
        const data = storage.getAll();
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

                        let parsedImportData: WorkingData[];
                        try {
                            parsedImportData = JSON.parse(data);
                        } catch {
                            throw new Error("Uploaded file is not in JSON format.");
                        }
                        validateQuests(parsedImportData);

                        updateTableData();
                        renderCompletedPercentage();

                        function validateQuests(questData: WorkingData[]) {
                            for (let i = 0; i < workingData.length; i++) {
                                if (
                                    workingData[i].name !== questData[i].name ||
                                    workingData[i].id !== questData[i].id
                                ) {
                                    console.log(i);

                                    console.log(workingData[i].name);
                                    console.log(questData[i].name);
                                    throw new Error("Quest names or ids doesn't match");
                                }

                                storage.saveOne(questData[i].id, questData[i].isCompleted);
                            }
                        }
                    } catch (error) {
                        alert(`${(error as Error).message}, please import correct data!`);
                    }
                } else {
                    fileInput.value = "";
                }
            });
        }
    });
})();
