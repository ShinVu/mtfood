<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductCategory>
 */
class ProductCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'name' => fake()->sentence($nbWords = 6, $variableNbWords = true),
            'description' => fake()->text($maxNbChars = 200),
            'parent_product_category_id' => (\App\Models\ProductCategory::all()->isEmpty()) ?  NULL : (\App\Models\ProductCategory::all()->random()->id)
        ];
    }
}
