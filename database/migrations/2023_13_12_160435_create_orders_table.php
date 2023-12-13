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
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); //order primary key
            $table->unsignedDecimal('total', $precision = 19, $scale = 4)->nullable(); //Total payment of order
            $table->unsignedDecimal('subtotal', $precision = 19, $scale = 4)->nullable(); //Subtotal of order before shipping total, discounts,...
            $table->unsignedDecimal('shipping_subtotal', $precision = 19, $scale = 4)->nullable(); //Subtotal of shipping
            $table->unsignedDecimal('voucher_discount', $precision = 19, $scale = 4)->nullable(); //Voucher discount
            $table->unsignedDecimal('products_discount', $precision = 19, $scale = 4)->nullable(); //Total products discount
            $table->unsignedDecimal('vat', $precision = 19, $scale = 4)->nullable(); //VAT
            $table->string('payment_method'); //Payment method
            $table->string('delivery_method'); //Delivery method
            $table->longText('notes')->nullable(); //order notes
            $table->string('order_code'); //order code
            $table->enum('status', ['created', 'planning', 'waiting_payment', 'waiting_confirm_payment', 'waiting_confirm', 'packing', 'waiting_shipment', 'shipping', 'delivered', 'completed', 'cancel_waiting_refund', 'canceled_refund', 'canceled', 'return_waiting_refund', 'returned']); //Order states
            $table->dateTime('confirmed_at')->nullable(); // when order is confirmed
            $table->dateTime('shipping_at')->nullable(); //when order is transfer to shipping party
            $table->dateTime('delivered_at')->nullable(); //when order is delivered
            $table->dateTime('reviewed_at')->nullable(); //when order is reviewed
            $table->boolean('is_order_wholesale')->default(false); //whether order is a part of wholesale 
            $table->unsignedBigInteger('order_wholesale_summary_id')->nullable(); //order summary id for wholesale
            $table->unsignedBigInteger('employee_id')->nullable(); //FK to id on employee
            $table->unsignedBigInteger('customer_id'); //FK to id on customer
            $table->unsignedBigInteger('delivery_address_id'); //FK to id on delivery address
            $table->unsignedBigInteger('order_discount_id')->nullable(); //FK to id on order discount
            $table->timestamps(); //created at, update at
            //CONSTRAINT
            $table->foreign('employee_id')->references('id')->on('employees')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('customer_id')->references('id')->on('customers')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreign('delivery_address_id')->references('id')->on('delivery_addresses')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('order_discount_id')->references('id')->on('order_discounts')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreign('order_wholesale_summary_id')->references('id')->on('order_wholesale_summary')->restrictOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //DROP CONSTRAINTS
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);
            $table->dropForeign(['customer_id']);
            $table->dropForeign(['delivery_address_id']);
            $table->dropForeign(['order_discount_id']);
        });
        Schema::dropIfExists('orders');
    }
};
