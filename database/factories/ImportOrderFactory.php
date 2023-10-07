<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ImportOrder>
 */
class ImportOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'total_amount' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'tax' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'discount_amount' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'order_code' => Str::random(10),
            'notes' => fake()->paragraph(),
            'payment_method' => 'COD',
            'status' => 'created',
            'employee_id' => \App\Models\Employee::all()->random()->id,
            'supplier_id' => \App\Models\Supplier::all()->random()->id
        ];
    }
}
