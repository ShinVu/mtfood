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
        Schema::create('customers', function (Blueprint $table) {
            $table->id(); //customer primary key
            $table->string('name'); //customer name
            $table->string('phone_number',15)->unique(); //customer phone number, also used as account
            $table->string('email')->unique(); //customer email
            $table->string('password'); //customer password
            $table->string('pin_code'); //customer pin code
            $table->string('identification_number', 12); //customer identification number
            $table->enum('gender', ['0', '1', '2']); //customer gender {0: male, 1: female, 2: non-binary}
            $table->string('address'); //customer address
            $table->dateTime('date_of_birth'); //customer date of birth
            $table->bolean('is_wholesale_customer'); //if customer is whole_sale
            $table->timestamp('email_verified_at')->nullable(); //Email verified timestamp
            $table->timestamp('phone_number_verified_at')->nullable(); //Phone number verified timestamp
            $table->string('ward_code',20); //Foreign key to ward_code on table ward
            $table->rememberToken(); //user token
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
