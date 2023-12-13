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
        Schema::create('order_detail_batches', function (Blueprint $table) {
            $table->bigIncrements('id'); // PK for table
            $table->unsignedBigInteger('order_detail_id'); //FK to order_detail
            $table->unsignedBigInteger('batch_id'); //FK to product_batch
            $table->unsignedSmallInteger('quantity'); //quantity of products of that batch
            $table->timestamps();
            //CONSTRAINT
            $table->foreign('order_detail_id')->references('id')->on('order_details')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('batch_id')->references('id')->on('product_batches')->restrictOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_detail_batches');
    }
};
