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
        Schema::create('products_tag', function (Blueprint $table) {
            $table->id(); //product tag primary key
            $table->string('name'); //name of tag
            $table->longText('description'); //description of tag
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_tag');
    }
};
