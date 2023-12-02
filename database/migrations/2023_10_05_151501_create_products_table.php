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
            $table->string('image_url', 2048)->nullable(); //product image url
            $table->longText('description')->nullable(); //product description
            $table->boolean('status')->default(1); //product status: if product is available or not
            $table->unsignedDecimal('price', $precision = 19, $scale = 4); //current price of product
            $table->string('unit')->default('VND'); //price unit
            $table->double('rating', 2, 1, true)->default(0); //products rating
            $table->unsignedInteger('quantity_available')->default(0); //product stock available
            $table->unsignedInteger('nums_of_reviews')->default(0); //product number of reviews
            $table->unsignedInteger('nums_of_like')->default(0); //product number of likes
            $table->string('origin', 20)->default('Việt Nam'); //product origin
            $table->string('exp_date')->nullable(); //product expiration date
            $table->string('directionForPreservation')->nullable(); //product direction for preservation
            $table->string('directionForUse')->nullable(); //product direction for use
            $table->string('weight')->nullable(); //product weight
            $table->string('pack')->nullable(); //product pack
            $table->string('ingredient')->nullable(); //product ingredients
            $table->boolean('is_wholesale')->default(false); //whether product is whoesale
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
