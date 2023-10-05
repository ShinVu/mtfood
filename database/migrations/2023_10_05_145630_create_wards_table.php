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
            $table->string('code', 20);
            $table->string('name');
            $table->string('name_en');
            $table->string('full_name');
            $table->string('full_name_en');
            $table->string('code_name');
            $table->string('district_code', 20);
            $table->unsignedBigInteger('administrative_unit_id');
            //CONSTRAINTS
            $table->primary('code');
            $table->foreign('administrative_unit_id')->references('id')->on('administrative_units')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('district_code')->references('code')->on('districts')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //DROP CONSTRAINTS
        Schema::table('wards', function (Blueprint $table) {
            $table->dropForeign(['administrative_unit_id']);
            $table->dropForeign(['district_code']);
        });
        Schema::dropIfExists('wards');
    }
};
