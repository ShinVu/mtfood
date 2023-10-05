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
        Schema::create('supplier', function (Blueprint $table) {
            $table->id(); //supplier primary key
            $table->string('name'); //name of supplier
            $table->string('contact_name'); //name of contact
            $table->string('contact_email'); //email of contact
            $table->string('address'); //address of supplier
            $table->string('phone_number'); //phone number of supplier
            //FK to ward id
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier');
    }
};
