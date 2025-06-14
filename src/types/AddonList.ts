export interface DefaultAddon {
    id: number;
    name: string;
    description: string;
    price: number;
    addonType: string; // 혹은 enum AddonType
}

export interface DefaultAddonsResponse {
    defaultAddonsResponse: {
        content: DefaultAddon[];
        totalPages: number;
        number: number;
        totalElements: number;
        size: number;
        first: boolean;
        last: boolean;
    };
}