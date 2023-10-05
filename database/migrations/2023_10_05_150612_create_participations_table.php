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
            $table->unsignedBigInteger('employee_id'); //FK to id on table employees
            $table->unsignedBigInteger('shift_id'); //FK to id on table shifts
            $table->timestamps(); //created at, update at
            //CONSTRAINTS
            $table->foreign('employee_id')->references('id')->on('employees')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreign('shift_id')->references('id')->on('shifts')->restrictOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         //DROP CONSTRAINTS
         Schema::table('participations', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);
            $table->dropForeign(['shift_id']);
        });
        Schema::dropIfExists('participations');
    }
};
