export interface Project {
    id: string;
    type: string;
    created: boolean;
    url: string;
    secret: string;
    api: {
        name: string;
    };
    apiKey: string;
}
