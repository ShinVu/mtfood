<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->text($maxNbChars = 20),
            'image_url' => 'https://source.unsplash.com/random',
            'description' => fake()->text($maxNbChars = 200),
            'status' => fake()->boolean(),
            'price' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'unit' => 'VND',
            'quantity_available' => fake()->numberBetween($min = 0, $max = 1000),
            'nums_of_reviews' => fake()->numberBetween($min = 0, $max = 1000),
            'nums_of_like' => fake()->numberBetween($min = 0, $max = 1000),
            'origin' => 'Việt Nam',
            'exp_date' => now(),
            'directionForPreservation' => 'None',
            'directionForUse' => 'None',
            'weight' => '1kg',
            'pack' => 'Bao bì',
            'ingredient' => 'Như mô tả',
            'category_id' => \App\Models\ProductCategory::all()->random()->id
        ];
    }
}
