<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductWholesalePricing>
 */
class ProductWholesalePricingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'price',
            'quantity_apply',
            'valid_from',
            'valid_to',
            'is_active',
            'product_id'
        ];
    }
}
