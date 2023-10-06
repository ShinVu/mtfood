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
        return [
            'total_amount',
            'tax',
            'discount_amount',
            'order_code',
            'notes',
            'payment_method',
            'status',
            'employee_id',
            'supplier_id'
        ];
    }
}
