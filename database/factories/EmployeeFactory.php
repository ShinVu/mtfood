<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
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
            'phone_number' => fake()->unique()->e164PhoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'password' => bcrypt("12345"),
            'identification_number' => (string) fake()->numberBetween($min = 00000000000, $max = 99999999999),
            'tax_code' => Str::random(10),
            'gender' => '0',
            'address' => fake()->address(),
            'status' => 0,
            'date_of_birth' => now(),
            'pay_rate' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'job_position' => 'employee',
            'ward_code' => \App\Models\Ward::all()->random()->code,
            'email_verified_at' => now(),
            'phone_number_verified_at' => now(),
            'remember_token' => Str::random(10)
        ];
    }
}
