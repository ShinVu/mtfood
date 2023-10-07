<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductPricing>
 */
class ProductPricingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'price' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'valid_from' => now(),
            'valid_to' => now(),
            'is_active' => fake()->boolean(),
            'product_id' => \App\Models\Product::all()->random()->id
        ];
    }
}
