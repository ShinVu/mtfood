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
            'name',
            'image_url',
            'description',
            'status',
            'price',
            'unit',
            'quantity_available',
            'nums_of_reviews',
            'nums_of_like',
            'origin',
            'exp_date',
            'directionForPreservation',
            'directionForUse',
            'weight',
            'pack',
            'ingredient',
            'category_id'
        ];
    }
}
