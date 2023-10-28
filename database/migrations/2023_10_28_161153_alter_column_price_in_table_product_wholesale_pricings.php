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
        Schema::table('product_wholesale_pricings', function (Blueprint $table) {
            $table->integer('price')->nullable();
            $table->integer('form')->default(0)->nullable();
            $table->integer('to')->default(0)->nullable();
            $table->char('unit_price')->nullable()->default('price')->comment('price|contact');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_wholesale_pricings', function (Blueprint $table) {
            $table->dropColumn(['price','form','to','unit_price']);
        });
    }
};
