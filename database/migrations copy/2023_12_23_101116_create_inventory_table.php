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
        Schema::create('inventory', function (Blueprint $table) {
            $table->increments('inventory_id');
            $table->string('inventory_code')->nullable();
            $table->string('inventory_note')->nullable();
            $table->string('staf_name')->nullable();
            $table->string('supplier_name')->nullable();
            $table->string('supplier_phone')->nullable();
            $table->unsignedBigInteger('account_id')->nullable();
            $table->integer('inventory_status')->nullable();
            $table->unsignedDecimal('total_amount', $precision = 19, $scale = 4);
            $table->dateTime('inventory_date');
            $table->timestamps( );
            //CONSTRAINT
            $table->foreign('account_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //DROP CONSTRAINTS
        Schema::table('inventory', function (Blueprint $table) {
            $table->dropForeign(['account_id']);
        });
        Schema::dropIfExists('inventory');
    }
};
