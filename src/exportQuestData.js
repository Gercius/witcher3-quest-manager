const downloadButton = document.querySelector(".download-quest-data");

downloadButton.addEventListener("click", () => {
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
