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
        Schema::create('participations', function (Blueprint $table) {
            $table->id(); //participations primary key
            $table->dateTime('start_at'); //shifts start time
            $table->dateTime('end_at'); //shifts end time
            $table->boolean('is_present'); //if employee is present during shift or not
            $table->boolean('is_late'); //if employee is late during shift
            $table->boolean('is_leave_early'); //if employee leave eary during shift
            $table->enum('leave_type', ['0', '1']); //employee type of day_off {0: "paid_leave", 1: "unpaid_leave"} 
            $table->timestamps(); //created at, update at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participations');
    }
};
