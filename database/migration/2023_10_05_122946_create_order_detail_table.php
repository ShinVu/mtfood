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
        Schema::create('order_detail', function (Blueprint $table) {
            $table->id(); //order detail primary key
            $table->unsignedInteger('quantity'); //quantity of product in order
            $table->unsignedDecimal('unit_price', $precision = 19, $scale = 4); //Unit price for product
            $table->unsignedDecimal('unit_discount', $precision = 19, $scale = 4); //Unit discount for product
            $table->string('batch_code'); //Batch code for product
            // FK to price
            // FK to discount
            // FK to batch
            // FK to order
            // FK to product

            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_detail');
    }
};
