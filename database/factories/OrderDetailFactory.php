<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderDetail>
 */
class OrderDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'quantity',
            'unit_price',
            'unit_discount',
            'batch_code',
            'pricing_id',
            'discount_id',
            'batch_id',
            'order_id',
            'product_id'
        ];
    }
}
