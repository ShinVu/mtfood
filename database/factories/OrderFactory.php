<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $a = array('created', 'waiting_payment', 'waiting_confirm_payment', 'waiting_confirm', 'packing', 'waiting_shipment', 'shipping', 'delivered', 'completed', 'cancel_waiting_refund', 'canceled_refund', 'canceled', 'return_wating_refund', 'returned');
        $random_keys = array_rand($a);
        $order_code = $a[$random_keys];
        return [
            'subtotal'  => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'shipping_subtotal' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'shipping_discount' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'voucher_discount' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'products_discount' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'order_discount' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'vat' => fake()->randomFloat($nbMaxDecimals = 0, $min = 0, $max = NULL),
            'payment_method' => 'COD',
            'delivery_method' => 'Normal',
            'notes' => fake()->text($maxNbChars = 10),
            'order_code' => Str::random(10),
            'status' => $order_code,
            'confirmed_at' => now(),
            'shipping_at' => now(),
            'delivered_at' => now(),
            'reviewed_at' => now(),
            'employee_id' => \App\Models\Employee::all()->random()->id,
            'customer_id' => \App\Models\Customer::all()->random()->id,
            'delivery_address_id' => \App\Models\DeliveryAddress::all()->random()->id,
            'order_discount_id' => \App\Models\OrderDiscount::all()->random()->id
        ];
    }
}
