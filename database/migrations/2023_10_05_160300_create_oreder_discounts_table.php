<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_discounts', function (Blueprint $table) {
            $table->id(); //order discount primary key
            $table->unsignedDecimal('total_discount', $precision = 19, $scale = 4); //Discount amount
            $table->string('discount_unit'); //discount unit
            $table->boolean('is_active'); //whether this discount is active
            $table->longText('notes'); //discount note
            $table->unsignedDecimal('minimum_order_value', $precision = 19, $scale = 4); //Minimum order value to apply discount
            $table->unsignedDecimal('maximum_discount_amount', $precision = 19, $scale = 4); //Max discount for order
            $table->dateTime('valid_from'); //discount valid from
            $table->dateTime('valid_to'); //discount valid to
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_discounts');
    }
};
