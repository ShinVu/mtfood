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
        Schema::create('products_pricing', function (Blueprint $table) {
            $table->id(); //product pricing primary key
            //FK to product_id
            $table->unsignedDecimal('maximum_discount_amount', $precision = 19, $scale = 4); //price of the product
            $table->dateTime('valid_from'); //price is valid from
            $table->dateTime('valid_to'); //price is valid to
            $table->boolean('is_active'); //whether price is still being applied for the product
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_pricing');
    }
};
