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
        Schema::create('provinces', function (Blueprint $table) {
            $table->string('code', 20);
            $table->string('name');
            $table->string('name_en');
            $table->string('full_name');
            $table->string('full_name_en');
            $table->string('code_name');
            $table->unsignedBigInteger('administrative_unit_id');
            $table->unsignedBigInteger('administrative_region_id');
            //CONSTRAINTS
            $table->primary('code');
            $table->foreign('administrative_unit_id')->references('id')->on('administrative_units')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('administrative_region_id')->references('id')->on('administrative_regions')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('provinces', function (Blueprint $table) {
            $table->dropForeign(['administrative_unit_id']);
            $table->dropForeign(['administrative_region_id']);
        });
        Schema::dropIfExists('provinces');
    }
};
