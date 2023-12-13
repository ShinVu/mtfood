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
        Schema::create('product_wholesale_pricings', function (Blueprint $table) {
            $table->id(); //product wholesale pricing primary key
            $table->unsignedDecimal('price', $precision = 19, $scale = 4); //price of the product
            $table->unsignedInteger('quantity_from')->nullable(); //Quantity from which the price to be applied
            $table->unsignedInteger('quantity_to')->nullable(); //Quantity to which the price to be applied
            $table->dateTime('valid_from'); //price is valid from
            $table->dateTime('valid_to'); //price is valid to
            $table->boolean('is_active'); //whether price is still being applied for the product
            $table->unsignedBigInteger('product_id'); //FK to id on product
            $table->timestamps(); //created at, update at
            //CONSTRAINT
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //DROP CONSTRAINTS
        Schema::table('product_wholesale_pricings', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
        });
        Schema::dropIfExists('product_wholesale_pricings');
    }
};
