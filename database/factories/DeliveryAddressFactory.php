<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DeliveryAddress>
 */
class DeliveryAddressFactory extends Factory
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
            'phone_number' => fake()->e164PhoneNumber(),
            'address' => fake()->address(),
            'default' => fake()->boolean(),
            'type' => fake()->boolean(),
            'ward_code' => \App\Models\Ward::all()->random()->code,
            'customer_id' => \App\Models\Customer::all()->random()->id
        ];
    }
}
