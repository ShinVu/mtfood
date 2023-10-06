<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductDiscount>
 */
class ProductDiscountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'discount_amount',
            'discount_unit',
            'is_active',
            'minimum_order_value',
            'maximum_discount_amount',
            'valid_from',
            'valid_to',
            'product_id'
        ];
    }
}
