<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'subtotal',
            'shipping_subtotal',
            'shipping_discount',
            'voucher_discount',
            'products_discount',
            'order_discount',
            'vat',
            'payment_method',
            'delivery_method',
            'notes',
            'order_code',
            'status',
            'confirmed_at',
            'shipping_at',
            'delivered_at',
            'reviewed_at',
            'employee_id',
            'customer_id',
            'delivery_address_id',
            'order_discount_id'
        ];
    }
}
