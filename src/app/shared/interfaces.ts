export interface Single {
    "name": string;
    "value": number;
};

export interface Multi {
    "name": string;
    "series": Single[];
};