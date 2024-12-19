import { getData } from "./utils";

export type Quests = Quest[];

interface Quest {
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

// Shouldn't be modified
export const originalQuestsData = await getData();

// copy of originalQuestsData, shared and modified across the website
export const workingData = [...originalQuestsData];
