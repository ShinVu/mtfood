<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplier>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'contact_name' => fake()->name(),
            'contact_email' => fake()->safeEmail(),
            'address' => fake()->address(),
            'phone_number' => fake()->e164PhoneNumber(),
            'ward_code' => \App\Models\Ward::all()->random()->code,
        ];
    }
}
