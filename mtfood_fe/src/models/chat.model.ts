export type userUtteredMessage = {
    message: string;
    sender: number | null;
    metadata: {
        user: {
            id: number;
            name: string;
        } | null;
        token: string | null;
    };
    timestamp: number;
    type: "user";
};

export type botUttererMessage = {
    message: string;
    timestamp: number;
    type: "bot";
    products?: Array<number>;
};
