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
            $table->string('name')->nullable(); //customer name
            $table->string('phone_number', 20)->unique()->nullable(); //customer phone number, also used as account
            $table->string('email')->unique()->nullable(); //customer email
            $table->string('password')->nullable(); //customer password
            $table->string('pin_code')->nullable(); //customer pin code
            $table->string('identification_number', 12)->nullable(); //customer identification number
            $table->enum('gender', ['0', '1', '2'])->nullable(); //customer gender {0: male, 1: female, 2: non-binary}
            $table->dateTime('date_of_birth')->nullable(); //customer date of birth
            $table->boolean('is_wholesale_customer'); //if customer is whole_sale
            $table->timestamp('email_verified_at')->nullable(); //Email verified timestamp
            $table->timestamp('phone_number_verified_at')->nullable(); //Phone number verified timestamp
            $table->string('ward_code', 20)->nullable(); //Foreign key to ward_code on table ward
            $table->rememberToken(); //user token
            $table->timestamps(); //created at, update at
            $table->string("verification_code", 6)->nullable(); // Account verification code
            $table->boolean("facebook_flag"); //Facebook login flag
            $table->string("facebook_id")->nullable(); //Facebook id 
            $table->boolean("google_flag"); //Google login flag
            $table->string("google_id")->nullable(); //Google id

            //CONSTRAINT
            $table->foreign('ward_code')->references('code')->on('wards')->restrictOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //DROP CONSTRAINTS
        Schema::table('customers', function (Blueprint $table) {
            $table->dropForeign(['ward_code']);
        });
        Schema::dropIfExists('customers');
    }
};
