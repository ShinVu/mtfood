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
        Schema::create('product_have_tag', function (Blueprint $table) {
            $table->id(); //product have tag primary key
            $table->unsignedBigInteger('product_id'); //FK to id on product
            $table->unsignedBigInteger('tag_id'); //FK to id on tag
            $table->timestamps(); //created at, update at
             //CONSTRAINT
             $table->foreign('product_id')->references('id')->on('products')->cascadeOnUpdate()->cascadeOnDelete();
             $table->foreign('tag_id')->references('id')->on('product_tags')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //DROP CONSTRAINTS
        Schema::table('product_have_tag', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
            $table->dropForeign(['tag_id']);
        });
        Schema::dropIfExists('product_have_tag');
    }
};
