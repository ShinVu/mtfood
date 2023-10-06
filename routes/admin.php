<?php

/**
 * Created By PhpStorm
 * User: trungphuna
 * Date: 9/23/23
 * Time: 4:37 PM
 */


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Be;


Route::group(['namespace' => 'Be','prefix' => 'admin'], function (){
    Route::get('',[Be\BeHomeController::class,'index'])->name('get_admin.home');

    Route::group(['prefix' => 'order'], function (){
        Route::get('',[Be\BeOrderController::class,'index'])->name('get_admin.order.index');
    });

    Route::group(['prefix' => 'product'], function (){
        Route::get('',[Be\BeProductController::class,'index'])->name('get_admin.product.index');
    });

    Route::group(['prefix' => 'chat'], function (){
        Route::get('',[Be\BeChatProductController::class,'index'])->name('get_admin.chat.index');
    });

    Route::group(['prefix' => 'user'], function (){
        Route::get('',[Be\BeUserController::class,'index'])->name('get_admin.user.index');
    });

    Route::group(['prefix' => 'category'], function (){
        Route::get('',[Be\BeCategoryController::class,'index'])->name('get_admin.category.index');
    });

    Route::group(['prefix' => 'admin'], function (){
        Route::get('',[Be\BeAdminController::class,'index'])->name('get_admin.admin.index');
    });
    Route::group(['prefix' => 'role'], function (){
        Route::get('',[Be\BeRoleController::class,'index'])->name('get_admin.role.index');
    });
});
