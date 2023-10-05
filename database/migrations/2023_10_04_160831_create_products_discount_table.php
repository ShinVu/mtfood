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
        Schema::create('products_discount', function (Blueprint $table) {
            $table->id(); //product discount primary key
            //product_id FK
            $table->unsignedDecimal('discount_amount', $precision = 19, $scale = 4); //discount amount
            $table->string('discount_unit'); //discount unit
            $table->string('is_active'); //whether the discount is active
            $table->unsignedDecimal('minimum_order_value', $precision = 19, $scale = 4); //minimum order value for the discount
            $table->unsignedDecimal('maximum_discount_amount', $precision = 19, $scale = 4); //maximum discount amount
            $table->dateTime('valid_from'); //discount is valid from
            $table->dateTime('valid_to'); //discount is valid to
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_discount');
    }
};
