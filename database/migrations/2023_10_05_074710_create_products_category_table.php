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
        Schema::create('products_category', function (Blueprint $table) {
            $table->id(); //category primary key
            $table->string('name'); //category name
            $table->longText('description'); //category description
            //FK to parent_product_category_id
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_category');
    }
};
