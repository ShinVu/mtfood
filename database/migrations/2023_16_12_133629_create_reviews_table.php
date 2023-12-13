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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); //reviews primary key
            $table->longText('content'); //reviews content
            $table->double('rating', 2, 1, true); //review rating
            $table->string('image_url'); //image url
            $table->smallInteger('nums_of_rate_useful'); //Nums of review rated useful
            $table->timestamps(); //created at, updated at
            // $table->unsignedTinyInteger('notification_type_id'); //FK to notification type id
            $table->unsignedBigInteger('product_id'); //FK to product id
            $table->unsignedBigInteger('customer_id'); //FK to id on customers
            $table->unsignedBigInteger('order_details_id')->nullable(); //FK to id on order details
            //CONSTRAINT
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('customer_id')->references('id')->on('customers')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('order_details_id')->references('id')->on('order_details')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
