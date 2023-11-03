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
};

export type priceCart = {
    totalPrice: number;
    totalSub: number;
    totalDiscount: number;
    totalProductDiscount: number;
    totalVoucher: number;
};

export type filter = {
    category: number | null;
    tag: Array<number> | null;
    price: {
        from: number | null;
        to: number | null;
    };
    service: {
        discount: boolean;
        voucher: boolean;
        onStock: boolean;
        wholesaleProduct: boolean;
    };
    rating: number;
    sort: string;
    offset: number;
    limit: number;
};
