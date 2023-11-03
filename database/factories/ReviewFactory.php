<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => fake()->text($maxNbChars = 20),
            'rating' => fake()->numberBetween($min = 0, $max = 5),
            'image_url' => 'https://source.unsplash.com/random',
            'nums_of_rate_useful' => fake()->numberBetween($min = 0, $max = 1000),
            'product_id' => \App\Models\Product::all()->random()->id,
            'customer_id' => \App\Models\Customer::all()->random()->id,
            'order_details_id' => \App\Models\OrderDetail::all()->random()->id
        ];
    }
}
