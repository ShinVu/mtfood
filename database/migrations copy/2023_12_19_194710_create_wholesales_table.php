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
        Schema::create('wholesale', function (Blueprint $table) {
            $table->unsignedBigInteger('account_id');
            $table->string('question1')->nullable();
            $table->string('question2')->nullable();
            $table->string('question3')->nullable();
            $table->string('question4')->nullable();
            $table->timestamps( );

            $table->primary('account_id');
            $table->foreign('account_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //DROP CONSTRAINTS
        // Schema::table('wholesale', function (Blueprint $table) {
        //     $table->dropForeign(['account_id']);
        // });
        //Schema::dropIfExists('wholesale');
    }
};
