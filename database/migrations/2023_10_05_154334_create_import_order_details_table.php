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
        Schema::create('import_order_details', function (Blueprint $table) {
            $table->id(); //import order detail primary key
            $table->unsignedInteger('quantity'); //number of product imported
            $table->unsignedDecimal('unit_price', $precision = 19, $scale = 4); //price of product
            $table->string('batch_code'); //batch code of product
            //FK for import order
            //FK for product
            $table->unsignedBigInteger('import_order_id'); //FK to id on import_order
            $table->unsignedBigInteger('product_id'); //FK to id on product
            $table->unsignedBigInteger('batch_id'); //FK to id on batch
            $table->timestamps(); //created at, update at
             //CONSTRAINT
             $table->foreign('import_order_id')->references('id')->on('import_orders')->cascadeOnUpdate()->restrictOnDelete();
             $table->foreign('product_id')->references('id')->on('products')->cascadeOnUpdate()->restrictOnDelete();
             $table->foreign('batch_id')->references('id')->on('product_batches')->cascadeOnUpdate()->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         //DROP CONSTRAINTS
         Schema::table('import_order_details', function (Blueprint $table) {
            $table->dropForeign(['import_order_id']);
            $table->dropForeign(['product_id']);
            $table->dropForeign(['batch_id']);

        });
        Schema::dropIfExists('import_order_details');
    }
};
