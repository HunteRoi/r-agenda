import { ActivityData } from "./ActivityData";

export type DayData = {
    day: string;
    activities: ActivityData;
    tasks: string[];
    meal: string;
};
