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
        Schema::create('delivery_addresses', function (Blueprint $table) {
            $table->id(); //delivery_address primary key

            $table->string('name'); //name of person to delivered to
            $table->string('phone_number', 15); //number to contact when delivering
            $table->string('address'); //Exact address to deliver
            $table->string('ward_code', 20); //Foreign key to ward_code on table ward
            $table->unsignedBigInteger('customer_id')->nullable(); //FK to id on customer
            $table->timestamps(); //created at, update at
            //CONSTRAINT
            $table->foreign('customer_id')->references('id')->on('customers')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('ward_code')->references('code')->on('wards')->restrictOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         //DROP CONSTRAINTS
         Schema::table('delivery_addresses', function (Blueprint $table) {
            $table->dropForeign(['ward_code']);
            $table->dropForeign(['customer_id']);
        });
        Schema::dropIfExists('delivery_addresses');
    }
};
