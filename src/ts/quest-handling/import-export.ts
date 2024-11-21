/* 
    EXPORT 
*/
const exportButton = document.querySelector(".export-quest-data");

exportButton.addEventListener("click", () => {
    if (window.confirm("Export quest data?")) {
        const data = getQuestData();
        exportQuestData(data, "quest-data.json");
    }
});

// Reference https://dev.to/nombrekeff/download-file-from-blob-21ho
function exportQuestData(blob, name = "file.txt") {
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
    const quests = document.querySelectorAll(".quest");
    const data = [];

    quests.forEach((quest) => {
        const id = quest.dataset.id;
        const name = quest.querySelector(".quest-name").textContent;
        const isCompleted = quest.querySelector(".quest-completed input").checked;
        const questInfo = {
            id,
            name,
            isCompleted,
        };
        data.push(questInfo);
    });

    const jsonString = JSON.stringify(data, null, 2);
    const jsonBlob = new Blob([jsonString], { type: "application/json" });
    return jsonBlob;
}

/* 
    IMPORT
    Reference https://openjavascript.info/2022/12/15/read-a-file-into-javascript-using-filereader/ 
*/
const fileInput = document.querySelector(".import-quest-data");

fileInput.addEventListener("change", () => {
    const fr = new FileReader();

    fr.readAsText(fileInput.files[0]);

    fr.addEventListener("load", () => {
        if (window.confirm("Import quest data?")) {
            try {
                const data = fr.result;
                const parsedImportData = JSON.parse(data);
                const questsEl = document.querySelectorAll("tbody tr.quest");

                parsedImportData.forEach((importObj) => {
                    for (const questEl of questsEl) {
                        const id = questEl.dataset.id;
                        let isCompletedCheckbox = questEl.querySelector(".quest-completed input");

                        if (importObj.id === id) {
                            isCompletedCheckbox.checked = importObj.isCompleted ? true : false;
                        }
                    }
                });
            } catch (error) {
                alert("Please import correct data");
            }
        } else {
            fileInput.value = "";
        }
    });
});
