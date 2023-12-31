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
        Schema::dropIfExists('products');
        Schema::create('products', function (Blueprint $table) {
            $table->increments('product_id');
            $table->string('product_image')->nullable();
            $table->string('product_name');
            $table->string('product_description');
            $table->unsignedBigInteger('product_category');
            $table->integer('product_brand');
            $table->integer('capacity_id')->nullable();
            $table->integer('product_quantity')->nullable();
            $table->integer('quantity_sales')->nullable();
            $table->unsignedDecimal('product_price_import', $precision = 19, $scale = 4)->nullable();
            $table->unsignedDecimal('product_price', $precision = 19, $scale = 4)->nullable();
            $table->integer('product_sale')->nullable();
            $table->integer('product_status')->nullable();
            $table->unsignedDecimal('level1', $precision = 19, $scale = 4)->nullable();
            $table->unsignedDecimal('level2', $precision = 19, $scale = 4)->nullable();
            $table->unsignedDecimal('level3', $precision = 19, $scale = 4)->nullable();
            $table->unsignedDecimal('level4', $precision = 19, $scale = 4)->nullable();
            $table->integer('product_weight')->nullable();

            $table->timestamps( );

            //CONSTRAINT
            $table->foreign('product_category')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
