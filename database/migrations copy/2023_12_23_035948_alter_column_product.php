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
        //
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedInteger('product_brand');
            $table->unsignedDecimal('level1', $precision = 19, $scale = 4);
            $table->unsignedDecimal('level2', $precision = 19, $scale = 4);
            $table->unsignedDecimal('level3', $precision = 19, $scale = 4);
            $table->unsignedDecimal('level4', $precision = 19, $scale = 4);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
