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
        Schema::create('product_batches', function (Blueprint $table) {
            $table->id(); //product batch primary key

            $table->string('batch_code'); //batch code
            $table->unsignedInteger('quantity'); //number of stocks of the batch
            $table->unsignedInteger('quantity_available'); //number of stocks available of the batch
            $table->dateTime('manufacturing_date'); //date of manufacturing
            $table->dateTime('expiry_date'); //date of expiration
            $table->unsignedBigInteger('product_id'); //FK to id on product
            $table->timestamps(); //created at, update at
            //CONSTRAINT
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
          //DROP CONSTRAINTS
          Schema::table('product_batches', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
        });
        Schema::dropIfExists('product_batches');
    }
};
