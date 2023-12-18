export type product = {
    id: number;
    name: string;
    image_url: string;
    description: string;
    status: number;
    price: string;
    rating: number;
    unit: string;
    quantity_available: number;
    nums_of_reviews: number;
    nums_of_like: number;
    origin: string;
    exp_date: string;
    directionForPreservation: string;
    directionForUse: string;
    weight: string;
    pack: string;
    ingredient: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    product_id: number;
    max_discount_amount: string | null;
    priceDiscount: string;
    product_image?: Array<{ image_url: string }>;
    product_wholesale_pricing?: {
        id: number;
        price: string;
        quantity_from: number;
        quantity_to: number;
        product_id: number;
    }[];
};

export type productCart = {
    id: number;
    name: string;
    image_url: string;
    description: string;
    status: number;
    price: string;
    rating: number;
    unit: string;
    quantity_available: number;
    quantityForProduct: number;
    nums_of_reviews: number;
    nums_of_like: number;
    origin: string;
    exp_date: string;
    directionForPreservation: string;
    directionForUse: string;
    weight: string;
    pack: string;
    ingredient: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    product_id: number;
    max_discount_amount: string | null;
    check: boolean;
    priceDiscount: string;
    product_wholesale_pricing?: {
        id: number;
        price: string;
        quantity_from: number;
        quantity_to: number;
        product_id: number;
    }[];
};

export type priceCart = {
    totalPrice: number;
    totalSub: number;
    totalDiscount: number;
    totalProductDiscount: number;
    totalVoucher: number;
};

export type priceWholesaleCart = {
    totalPrice: number;
    totalSub: number;
    totalShippingFee?: number;
};

export type filter = {
    category?: number | null;
    tag?: Array<number> | null;
    price_from?: number | null;
    price_to?: number | null;
    discount?: boolean;
    voucher?: boolean;
    onStock?: boolean;
    wholesaleProduct?: boolean;
    rating?: number;
    sort?: string;
};

export type searchOption = {
    type: string;
    id: number;
    name: string;
};
