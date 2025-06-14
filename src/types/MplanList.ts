export interface Addon {
    name: string;
    description: string;
    price: number;
    addonType: string;
}

export interface AddonGroup {
    addonGroupName: string;
    addonGroupAddonsResponse: Addon[];
}

export interface Mplan {
    id: number;
    name: string;
    basicDataAmount: number;
    dailyData: number;
    sharingData: number;
    monthlyPrice: number;
    voiceCallVolume: number;
    textMessage: boolean;
    subDataSpeed: number;
    qualification: string;
    mplanType: string;
    dataType: string;
    addonGroupResponse: AddonGroup | null;
}

export interface MplanPageResponse {
    mplansResponse: {
        content: Mplan[];
        totalPages: number;
        number: number;
        totalElements: number;
        size: number;
        first: boolean;
        last: boolean;
    };
}
