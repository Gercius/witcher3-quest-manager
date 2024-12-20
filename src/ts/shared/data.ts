import { getData } from "./utils";

export type Quests = Quest[];

interface Quest {
    id: number;
    location: string;
    questInfo: QuestInfo;
    extraDetails: ExtraDetail[];
}

interface QuestInfo {
    name: string;
    hyperlink: string;
    type: string;
    orderMatters: boolean;
    isCompleted: boolean;
}

interface ExtraDetail {
    description: string;
    hyperlink: string;
    isCompleted: boolean;
}

// Data for table rendering
export const initialQuestData = await getData();

export interface WorkingData {
    id: number;
    name: string;
    isCompleted: boolean;
}

// Data for updating quests changes
export const workingData: WorkingData[] = initialQuestData.map((quest: Quest) => {
    return {
        id: quest.id,
        name: quest.questInfo.name,
        isCompleted: quest.questInfo.isCompleted,
    };
});

export const questIds = workingData.map((quest) => quest.id);
