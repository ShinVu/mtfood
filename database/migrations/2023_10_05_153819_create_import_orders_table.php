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
        Schema::create('import_orders', function (Blueprint $table) {
            $table->id(); //import order primary key
            $table->unsignedDecimal('total_amount', $precision = 19, $scale = 4); //Total order amount
            $table->unsignedDecimal('tax', $precision = 19, $scale = 4); //tax of order
            $table->unsignedDecimal('discount_amount', $precision = 19, $scale = 4); //order discount
            $table->string('order_code'); //order code
            $table->string('notes'); //order note
            $table->string('payment_method'); //order payment method
            $table->string('status'); //order status
            $table->unsignedBigInteger('employee_id'); //FK to id on employee
            $table->unsignedBigInteger('supplier_id'); //FK to id on supplier
            $table->timestamps(); //created at, update at
            //CONSTRAINT
            $table->foreign('employee_id')->references('id')->on('employees')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('supplier_id')->references('id')->on('suppliers')->cascadeOnUpdate()->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         //DROP CONSTRAINTS
         Schema::table('import_orders', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);
            $table->dropForeign(['supplier_id']);
        });
        Schema::dropIfExists('import_orders');
    }
};
