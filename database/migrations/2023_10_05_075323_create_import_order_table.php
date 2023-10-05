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
        Schema::create('import_order', function (Blueprint $table) {
            $table->id(); //import order primary key
            $table->unsignedDecimal('total_amount', $precision = 19, $scale = 4); //Total order amount
            $table->unsignedDecimal('tax', $precision = 19, $scale = 4); //tax of order
            $table->unsignedDecimal('discount_amount', $precision = 19, $scale = 4); //order discount
            $table->string('order_code'); //order code
            $table->string('notes'); //order note
            $table->string('payment_method'); //order payment method
            $table->string('status'); //order status
            //FK to employee
            //FK to supplier
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('import_order');
    }
};
