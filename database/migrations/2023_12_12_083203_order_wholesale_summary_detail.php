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
        Schema::create('order_wholesale_summary_detail', function (Blueprint $table) {
            $table->id(); //order sumamry detail primary key
            $table->unsignedInteger('quantity'); //quantity of product in order
            $table->unsignedDecimal('unit_price', $precision = 19, $scale = 4); //Unit price for product
            $table->unsignedInteger('quantity_delivered'); //quantity of product delivered
            $table->unsignedBigInteger('wholesale_pricing_id')->nullable(); // FK to id on wholesale_pricings, for wholesale order
            $table->unsignedBigInteger('order_wholesale_summary_id'); //FK to id on order_summary
            $table->unsignedBigInteger('product_id'); //FK to id on products
            $table->timestamps(); //created at, update at
            //CONSTRAINT
            $table->foreign('product_id')->references('id')->on('products')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreign('wholesale_pricing_id')->references('id')->on('product_wholesale_pricings')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreign('order_wholesale_summary_id')->references('id')->on('order_wholesale_summary')->restrictOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_wholesale_summary_detail');
    }
};
