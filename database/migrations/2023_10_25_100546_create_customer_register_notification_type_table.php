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
        Schema::create('customer_register_notification_type', function (Blueprint $table) {
            $table->id(); //customer_register_notification_type primary key
            $table->boolean('is_activated'); //whether customer activate this notification type
            $table->timestamps(); //created at, updated at
            // $table->unsignedTinyInteger('notification_type_id'); //FK to notification type id
            $table->unsignedTinyInteger('notification_type_id'); //FK to notification type id
            $table->unsignedBigInteger('customer_id'); //FK to id on customers
            //CONSTRAINT
            $table->foreign('notification_type_id')->references('id')->on('notification_types')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('customer_id')->references('id')->on('customers')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_register_notification_type');
    }
};
