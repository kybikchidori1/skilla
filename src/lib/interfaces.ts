export type PriceItem = null | number;
export type SortType = "Up" | "Down";

export interface CourseItem {
    name: string;
    prices: PriceItem[];
}
