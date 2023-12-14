export type orderDetailProduct = {
    id: number;
    name: string;
    image_url: string;
    image_path: string;
    description: string;
    status: number;
    price: string;
    unit: string;
    rating: number;
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
    is_wholesale: boolean;
    category_id: number;
    created_at: string;
    updated_at: string;
};

export type orderDetail = {
    id: number;
    quantity: number;
    unit_price: string;
    unit_discount: string;
    batch_code: string;
    pricing_id: number;
    discount_id: number;
    batch_id: number;
    order_id: number;
    product_id: number;
    created_at: string;
    updated_at: string;
    product: orderDetailProduct;
};

export type orderType = {
    id: number;
    subtotal: string;
    total: string;
    shipping_subtotal: string;

    voucher_discount: string;
    products_discount: string;

    vat: string;
    payment_method: string;
    delivery_method: string;
    notes: string;
    order_code: string;
    status: string;
    confirmed_at: string;
    shipping_at: string;
    delivered_at: string;
    reviewed_at: string;
    customer_id: number;
    delivery_address_id: number;
    order_discount_id: number;
    created_at: string;
    updated_at: string;
    order_detail: orderDetail[];
};

export type orderVoucher = {
    id: number;
    notes: string;
    total_discount: string;
    is_active: boolean;
    minimum_order_value: string;
    maximum_discount_amount: string;
};
