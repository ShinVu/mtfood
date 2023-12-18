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
        Schema::create('order_wholesale_summary', function (Blueprint $table) {
            $table->id(); //order primary key
            $table->unsignedDecimal('total', $precision = 19, $scale = 4)->nullable(); //Total payment of order
            $table->unsignedDecimal('total_paid', $precision = 19, $scale = 4)->nullable(); //Total payment paid
            $table->string('payment_method'); //Payment method
            $table->string('delivery_method'); //Delivery method
            $table->longText('notes')->nullable(); //order notes
            $table->string('order_code'); //order code
            $table->enum('status', ['created', 'waiting_confirm', 'in_process', 'completed']); //Order states
            $table->dateTime('confirmed_at')->nullable(); // when order is confirmed
            $table->dateTime('completed_at')->nullable(); //when order is completed
            $table->unsignedBigInteger('employee_id')->nullable(); //FK to id on employee
            $table->unsignedBigInteger('customer_id'); //FK to id on customer
            $table->unsignedBigInteger('delivery_address_id'); //FK to id on delivery address
            $table->timestamps(); //created at, update at
            //CONSTRAINT
            $table->foreign('employee_id')->references('id')->on('employees')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('customer_id')->references('id')->on('customers')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreign('delivery_address_id')->references('id')->on('delivery_addresses')->cascadeOnUpdate()->cascadeOnDelete();
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
