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
        Schema::create('products_batch', function (Blueprint $table) {
            $table->id(); //product batch primary key
            //FK to product_id
            $table->string('batch_code'); //batch code
            $table->unsignedInteger('quantity'); //number of stocks of the batch
            $table->unsignedInteger('quantity_available'); //number of stocks available of the batch
            $table->dateTime('manufacturing_date'); //date of manufacturing
            $table->dateTime('expiry_date'); //date of expiration
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_batch');
    }
};
