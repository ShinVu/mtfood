<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderDiscount>
 */
class OrderDiscountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'total_discount',
            'discount_unit',
            'is_active',
            'notes',
            'minimum_order_value',
            'maximum_discount_amount',
            'valid_from',
            'valid_to'
        ];
    }
}
