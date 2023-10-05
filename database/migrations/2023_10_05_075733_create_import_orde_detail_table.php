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
        Schema::create('import_order_detail', function (Blueprint $table) {
            $table->id(); //import order detail primary key
            $table->unsignedInteger('quantity'); //number of product imported
            $table->unsignedDecimal('unit_price', $precision = 19, $scale = 4); //price of product
            $table->string('batch_code'); //batch code of product
            $table->
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('import_order_detail');
    }
};
