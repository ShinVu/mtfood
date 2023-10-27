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
        Schema::create('customer_have_notification', function (Blueprint $table) {
            $table->id(); //customer_have_notification primary key
            $table->boolean('delete'); //Whether customer delete this notification
            $table->boolean('read'); //Whether customer read this notification
            $table->unsignedBigInteger('notification_id'); //FK to id on notifications
            $table->unsignedBigInteger('customer_id'); //FK to id on customers
            $table->timestamps(); //created at, updated at
            //CONSTRAINT
            $table->foreign('notification_id')->references('id')->on('notifications')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('customer_id')->references('id')->on('customers')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_have_notification');
    }
};
