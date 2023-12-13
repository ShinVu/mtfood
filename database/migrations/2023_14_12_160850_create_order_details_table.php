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
        Schema::create('order_details', function (Blueprint $table) {
            $table->id(); //order detail primary key
            $table->unsignedInteger('quantity'); //quantity of product in order
            $table->unsignedDecimal('unit_price', $precision = 19, $scale = 4); //Unit price for product
            $table->unsignedDecimal('unit_discount', $precision = 19, $scale = 4); //Unit discount for product
            $table->unsignedBigInteger('pricing_id')->nullable(); //FK to id on product_pricings
            $table->unsignedBigInteger('wholesale_pricing_id')->nullable(); // FK to id on wholesale_pricings, for wholesale order
            $table->unsignedBigInteger('discount_id')->nullable(); //FK to id product_discounts
            $table->unsignedBigInteger('order_id'); //FK to id on orders
            $table->unsignedBigInteger('product_id'); //FK to id on products
            $table->timestamps(); //created at, update at
            //CONSTRAINT
            $table->foreign('pricing_id')->references('id')->on('product_pricings')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('discount_id')->references('id')->on('product_discounts')->restrictOnDelete()->restrictOnDelete();

            $table->foreign('order_id')->references('id')->on('orders')->restrictOnDelete()->cascadeOnDelete();
            $table->foreign('product_id')->references('id')->on('products')->restrictOnDelete()->restrictOnDelete();
            $table->foreign('wholesale_pricing_id')->references('id')->on('product_wholesale_pricings')->restrictOnDelete()->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //DROP CONSTRAINTS
        Schema::table('order_details', function (Blueprint $table) {
            $table->dropForeign(['pricing_id']);
            $table->dropForeign(['discount_id']);
            $table->dropForeign(['batch_id']);
            $table->dropForeign(['order_id']);
            $table->dropForeign(['product_id']);
        });
        Schema::dropIfExists('order_details');
    }
};
