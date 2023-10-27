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
        Schema::create('products', function (Blueprint $table) {
            $table->id(); //product primary key
            $table->string('name'); //product name
            $table->string('image_url'); //product image url
            $table->longText('description'); //product description
            $table->boolean('status')->default(1); //product status: if product is available or not
            $table->unsignedDecimal('price', $precision = 19, $scale = 4); //current price of product
            $table->string('unit'); //price unit
            $table->double('rating', 2, 1, true)->default(0); //products rating
            $table->unsignedInteger('quantity_available'); //product stock available
            $table->unsignedInteger('nums_of_reviews')->default(0); //product number of reviews
            $table->unsignedInteger('nums_of_like')->default(0); //product number of likes
            $table->string('origin', 20)->default('Việt Nam'); //product origin
            $table->dateTime('exp_date'); //product expiration date
            $table->string('directionForPreservation'); //product direction for preservation
            $table->string('directionForUse'); //product direction for use
            $table->string('weight'); //product weight
            $table->string('pack'); //product pack
            $table->string('ingredient'); //product ingredients
            $table->unsignedBigInteger('category_id')->nullable(); //FK to id on table categories
            $table->timestamps(); //created at, update at
            //CONSTRAINT
            $table->foreign('category_id')->references('id')->on('categories')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //DROP CONSTRAINTS
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
        });
        Schema::dropIfExists('products');
    }
};
