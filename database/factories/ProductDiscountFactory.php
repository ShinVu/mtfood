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
            'discount_amount' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'discount_unit' => 'VND',
            'is_active' => fake()->boolean(),
            'minimum_order_value' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'maximum_discount_amount' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'valid_from' => now(),
            'valid_to' => now(),
            'product_id' => \App\Models\Product::all()->random()->id
        ];
    }
}
