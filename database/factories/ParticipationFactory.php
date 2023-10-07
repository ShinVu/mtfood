<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Participation>
 */
class ParticipationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'start_at' => now(),
            'end_at' => now(),
            'is_present' => fake()->boolean(),
            'is_late' => fake()->boolean(),
            'is_leave_early' => fake()->boolean(),
            'leave_type' => fake()->boolean(),
            'employee_id' => \App\Models\Employee::all()->random()->id,
            'shift_id' => \App\Models\Shift::all()->random()->id
        ];
    }
}
