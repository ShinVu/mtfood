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
        Schema::create('inventory_detail', function (Blueprint $table) {
            $table->increments('inventory_detail_id');
            $table->string('inventory_code')->nullable();
            $table->Integer('product_date_import')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedDecimal('product_price_import', $precision = 19, $scale = 4);
            $table->integer('product_quantity')->nullable();
            $table->timestamps( );
            //CONSTRAINT
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //DROP CONSTRAINTS
        // Schema::table('inventory_detail', function (Blueprint $table) {
        //     $table->dropForeign(['account_id']);
        // });
        Schema::dropIfExists('inventory_detail');
    }
};
