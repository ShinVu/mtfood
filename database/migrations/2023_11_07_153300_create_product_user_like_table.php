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
        Schema::create('user_like_product', function (Blueprint $table) {
            $table->id(); //user like product primary key
            $table->unsignedBigInteger('product_id'); //FK to id on product
            $table->unsignedBigInteger('customer_id'); //FK to id on customer
            $table->timestamps(); //created at, update at

            //CONSTRAINT
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('customer_id')->references('id')->on('customers')->restrictOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_like_product');
    }
};
