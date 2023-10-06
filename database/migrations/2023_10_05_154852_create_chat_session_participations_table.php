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
        Schema::create('chat_session_participations', function (Blueprint $table) {
            $table->id(); //chat session participation primary key

            $table->boolean('participant_type'); //type of participant {0: employee, 1: customer}
            $table->dateTime('join_at'); //when participant join the chat
            $table->dateTime('last_message_at'); //last message timestamp
            $table->unsignedBigInteger('chat_session_id'); //FK to id on chat_sessions
            $table->unsignedBigInteger('employee_id')->nullable(); //FK to id on employee
            $table->unsignedBigInteger('customer_id')->nullable(); //FK to id on customer
            $table->timestamps(); //created at, update at
            //CONSTRAINT
            $table->foreign('chat_session_id')->references('id')->on('chat_sessions')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('employee_id')->references('id')->on('employees')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('customer_id')->references('id')->on('customers')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //DROP CONSTRAINTS
        Schema::table('chat_session_participations', function (Blueprint $table) {
            $table->dropForeign(['chat_session_id']);
            $table->dropForeign(['employee_id']);
            $table->dropForeign(['customer_id']);
        });
        Schema::dropIfExists('chat_session_participations');
    }
};
