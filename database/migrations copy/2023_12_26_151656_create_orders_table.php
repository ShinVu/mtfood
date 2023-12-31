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
        Schema::create('delivery', function (Blueprint $table) {
            $table->increments('delivery_id');
            $table->unsignedBigInteger('account_id')->nullable();
            $table->string('delivery_address')->nullable();
            $table->string('delivery_name')->nullable();
            $table->string('delivery_note')->nullable();
            $table->string('delivery_phone')->nullable();
            $table->integer('district')->nullable();
            $table->integer('province')->nullable();
            $table->integer('ward')->nullable();
            $table->timestamps( );
            //CONSTRAINT
            $table->foreign('account_id')->references('id')->on('users');
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->increments('order_id');
            $table->string('order_code')->nullable();
            $table->unsignedBigInteger('account_id')->nullable();
            $table->unsignedBigInteger('delivery_id')->nullable();
            $table->string('GHN_code')->nullable();
            $table->string('order_date')->nullable();
            $table->integer('order_flag')->nullable();
            $table->integer('order_status')->nullable();
            $table->integer('order_type')->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->unsignedDecimal('total_amount', $precision = 19, $scale = 4);
            $table->integer('wholesale')->nullable();

            $table->timestamps( );
            //CONSTRAINT
            $table->foreign('account_id')->references('id')->on('users');
            //$table->foreign('delivery_id')->references('delivery_id')->on('delivery');
        });

        Schema::create('order_detail', function (Blueprint $table) {
            $table->increments('order_detail_id');
            $table->string('order_code')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedDecimal('product_price', $precision = 19, $scale = 4);
            $table->integer('product_quantity')->nullable();
            $table->integer('product_sale')->nullable();

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
        Schema::dropIfExists('delivery');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('order_detail');
    }
};
