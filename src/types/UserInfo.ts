export interface Subscription {
    id: number;
    fee: number;
    mplanResponse: {
        id: number;
        name: string;
    };
}

export interface SubscriptionsResponse {
    subscriptionsResponse: Subscription[];
}

export interface UserInfo {
    id: number;
    email: string;
    phoneNumber: string;
    old: number;
    gender: 'M' | 'F' | string;
    name: string;
    category: string;
    createdAt: string;    // ISO 문자열
    deletedAt: string | null;
    activeYn: boolean;
    role: string;
    useAmount: number;
    subscriptionsResponse: SubscriptionsResponse;
}