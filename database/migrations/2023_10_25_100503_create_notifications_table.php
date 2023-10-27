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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id(); //notifications primary key
            $table->longText('body'); //notifications body 
            $table->string('header'); //notifications header
            $table->unsignedTinyInteger('notification_type_id'); //FK to notification type id
            $table->timestamps(); //created at, updated at
            //CONSTRAINT
            // $table->foreign('employee_id')->references('id')->on('employees')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('notification_type_id')->references('id')->on('notification_types')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
