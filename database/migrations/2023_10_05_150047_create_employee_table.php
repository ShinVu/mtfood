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
        Schema::create('employees', function (Blueprint $table) {
            $table->id(); //Employee primary key
            $table->string('name'); //Employee name
            $table->string('phone_number', 15)->unique(); //Employee phone number
            $table->string('email')->unique(); //Employee email
            $table->string('password'); //employee password
            $table->string('identification_number', 12); //Employee identification number
            $table->string('tax_code', 12)->nullable(); //Employee tax code
            $table->enum('gender', ['0', '1', '2']); //Employee gender {0: male, 1: female, 2: non-binary}
            $table->string('address'); //Employee address
            $table->boolean('status'); //Employee working status
            $table->dateTime('date_of_birth'); //Employee date of birth
            $table->unsignedDecimal('pay_rate', $precision = 19, $scale = 4); //Employee pay rate
            $table->string('job_position'); //Employee job position
            $table->timestamp('email_verified_at')->nullable(); //Email verified timestamp
            $table->timestamp('phone_number_verified_at')->nullable(); //Phone number verified timestamp
            $table->string('ward_code', 20); //Foreign key to ward_code on table ward
            $table->rememberToken(); //user token
            $table->timestamps(); //created at, update at
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
        Schema::table('employees', function (Blueprint $table) {
            $table->dropForeign(['ward_code']);
        });
        Schema::dropIfExists('employees');
    }
};
