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
        Schema::create('categories', function (Blueprint $table) {
            $table->id(); //category primary key
            $table->string('name'); //category name
            $table->longText('description'); //category description
            $table->unsignedBigInteger('parent_product_category_id')->nullable(); //FK to id on table categories
            $table->timestamps(); //created at, update at
            //CONSTRAINT
            $table->foreign('parent_product_category_id')->references('id')->on('categories')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         //DROP CONSTRAINTS
         Schema::table('categories', function (Blueprint $table) {
            $table->dropForeign(['parent_product_category_id']);
        });
        Schema::dropIfExists('categories');
    }
};
