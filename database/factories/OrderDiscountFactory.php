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
            'total_discount' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'discount_unit' => 'VND',
            'is_active' => fake()->boolean(),
            'notes' => fake()->text($maxNbChars = 200),
            'minimum_order_value' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'maximum_discount_amount' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'valid_from' => now(),
            'valid_to' => now()
        ];
    }
}
