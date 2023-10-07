<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductBatch>
 */
class ProductBatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'batch_code' => Str::random(10),
            'quantity' => fake()->numberBetween($int1 = 1, $int2 = 1000),
            'quantity_available' => fake()->numberBetween($int1 = 0, $int2 = 1000),
            'manufacturing_date' => now(),
            'expiry_date' => now(),
            'product_id' => \App\Models\Product::all()->random()->id
        ];
    }
}
