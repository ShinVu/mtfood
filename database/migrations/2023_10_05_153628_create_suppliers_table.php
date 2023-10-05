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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id(); //supplier primary key
            $table->string('name'); //name of supplier
            $table->string('contact_name'); //name of contact
            $table->string('contact_email'); //email of contact
            $table->string('address'); //address of supplier
            $table->string('phone_number'); //phone number of supplier
            $table->string('ward_code', 20); //Foreign key to ward_code on table ward
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
          Schema::table('suppliers', function (Blueprint $table) {
            $table->dropForeign(['ward_code']);
        });
        Schema::dropIfExists('suppliers');
    }
};
