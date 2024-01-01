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
        Schema::create('account', function (Blueprint $table) {
            $table->increments('account_id');
            $table->string('account_name')->nullable();
            $table->string('account_password')->nullable();
            $table->string('account_email')->nullable();
            $table->string('account_phone')->nullable();
            $table->integer('account_status')->nullable();
            $table->integer('account_type')->nullable();
            $table->integer('wholesale')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account');
    }
};
