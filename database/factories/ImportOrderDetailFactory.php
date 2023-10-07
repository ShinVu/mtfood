<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ImportOrderDetail>
 */
class ImportOrderDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $random_batch = \App\Models\ProductBatch::all()->random();
        return [
            'quantity' => fake()->numberBetween($int1 = 1, $int2 = 100),
            'unit_price' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'batch_code' =>   $random_batch->batch_code,
            'import_order_id' => \App\Models\ImportOrder::all()->random()->id,
            'product_id' => \App\Models\Product::all()->random()->id,
            'batch_id' =>   $random_batch->id
        ];
    }
}
