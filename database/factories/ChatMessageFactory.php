<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChatMessage>
 */
class ChatMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'message' => fake()->text($maxNBChars = 200),
            'image_url' => 'none',
            'participant_type' => fake()->boolean(),
            'chat_session_id' => \App\Models\ChatSession::all()->random()->id,
            'employee_id' => \App\Models\Employee::all()->random()->id,
            'customer_id' => \App\Models\Customer::all()->random()->id
        ];
    }
}
