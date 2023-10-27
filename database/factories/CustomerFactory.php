<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
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
            "phone_number" => fake()->unique()->e164PhoneNumber(),
            "email" => fake()->unique()->safeEmail(),
            "password" => bcrypt('12345'),
            'pin_code' => '12345',
            'identification_number' => (string) fake()->numberBetween($min = 00000000000, $max = 99999999999),
            'gender' => '0',
            'date_of_birth' => now(),
            'is_wholesale_customer' => fake()->boolean(),
            'email_verified_at' => now(),
            'phone_number_verified_at' => now(),
            'ward_code' => \App\Models\Ward::all()->random()->code,
            'remember_token' => Str::random(10),
            'facebook_flag' => 0,
            'google_flag' => 0

        ];
    }
}
