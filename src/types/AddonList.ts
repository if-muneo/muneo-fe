export interface DefaultAddonResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    addonType: string; // 혹은 enum AddonType
}

export interface DefaultAddonsResponse {
    defaultAddonsResponse: {
        content: DefaultAddonResponse[];
        totalPages: number;
        number: number;
        totalElements: number;
        size: number;
        first: boolean;
        last: boolean;
    };
}