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
        Schema::create('wards', function (Blueprint $table) {
            $table->id(); //ward primary key
            $table->string('ward_code',20); //ward ofiicial code
            $table->string('full_name'); //ward full name in vietnamese
            $table->string('district_code'); //foreign key to district_code on table district
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wards');
    }
};
