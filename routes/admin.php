<?php

/**
 * Created By PhpStorm
 * User: trungphuna
 * Date: 9/23/23
 * Time: 4:37 PM
 */


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Be;

Route::group(['namespace' => 'Backend','prefix' => 'auth'], function () {
    Route::get('login', [\App\Http\Controllers\Auth\BeAuthController::class, 'login'])->name('get_admin.login');
    Route::post('login', [\App\Http\Controllers\Auth\BeAuthController::class, 'postLogin']);
    Route::get('logout',[\App\Http\Controllers\Auth\BeAuthController::class,'logout'])->name('get_admin.logout');
});

Route::group(['namespace' => 'Be','prefix' => 'admin','middleware' => 'check.login.admin'], function (){
    Route::get('',[Be\BeHomeController::class,'index'])->name('get_admin.home')->middleware('permission:full|admin_home');

    Route::group(['prefix' => 'order'], function (){
        Route::get('',[Be\BeOrderController::class,'index'])->name('get_admin.order.index')->middleware('permission:full|order_index');
    });

    Route::group(['prefix' => 'product'], function (){
        Route::get('',[Be\BeProductController::class,'index'])->name('get_admin.product.index')->middleware('permission:full|product_index');

        Route::get('create',[Be\BeProductController::class,'create'])->name('get_admin.product.create')->middleware('permission:full|product_store');
        Route::post('create',[Be\BeProductController::class,'store']);

        Route::get('update/{id}',[Be\BeProductController::class,'edit'])->name('get_admin.product.update')->middleware('permission:full|product_update');
        Route::post('update/{id}',[Be\BeProductController::class,'update']);

        Route::get('delete/{id}',[Be\BeProductController::class,'delete'])->name('get_admin.product.delete')->middleware('permission:full|product_delete');
    });

    Route::group(['prefix' => 'chat'], function (){
        Route::get('',[Be\BeChatProductController::class,'index'])->name('get_admin.chat.index')->middleware('permission:full|chat_index');
    });

    Route::group(['prefix' => 'user'], function (){
        Route::get('',[Be\BeUserController::class,'index'])->name('get_admin.user.index')->middleware('permission:full|user_index');
        Route::get('create',[Be\BeUserController::class,'create'])->name('get_admin.user.create')->middleware('permission:full|user_store');
        Route::post('create',[Be\BeUserController::class,'store'])->name('get_admin.user.store');

        Route::get('update/{id}',[Be\BeUserController::class,'edit'])->name('get_admin.user.update')->middleware('permission:full|user_update');
        Route::post('update/{id}',[Be\BeUserController::class,'update'])->name('get_admin.user.update');
        Route::get('delete/{id}',[Be\BeUserController::class,'delete'])->name('get_admin.user.delete')->middleware('permission:full|user_delete');
    });

    Route::group(['prefix' => 'category'], function (){
        Route::get('',[Be\BeCategoryController::class,'index'])->name('get_admin.category.index')->middleware('permission:full|category_index');
        Route::get('create',[Be\BeCategoryController::class,'create'])->name('get_admin.category.create')->middleware('permission:full|category_store');
        Route::post('create',[Be\BeCategoryController::class,'store']);

        Route::get('update/{id}',[Be\BeCategoryController::class,'edit'])->name('get_admin.category.update')->middleware('permission:full|category_update');
        Route::post('update/{id}',[Be\BeCategoryController::class,'update']);

        Route::get('delete/{id}',[Be\BeCategoryController::class,'delete'])->name('get_admin.category.delete')->middleware('permission:full|category_delete');
    });

    Route::group(['prefix' => 'admin'], function (){
        Route::get('',[Be\BeAdminController::class,'index'])->name('get_admin.admin.index')->middleware('permission:full|admin_index');
    });
    Route::group(['prefix' => 'role'], function (){
        Route::get('',[Be\BeRoleController::class,'index'])->name('get_admin.role.index')->middleware('permission:full|role_index');
        Route::get('create',[Be\BeRoleController::class,'create'])->name('get_admin.role.create')->middleware('permission:full|role_store');
        Route::post('create',[Be\BeRoleController::class,'store'])->name('get_admin.role.store');

        Route::get('update/{id}',[Be\BeRoleController::class,'edit'])->name('get_admin.role.update')->middleware('permission:full|role_update');
        Route::post('update/{id}',[Be\BeRoleController::class,'update'])->name('get_admin.role.update');
        Route::get('delete/{id}',[Be\BeRoleController::class,'delete'])->name('get_admin.role.delete')->middleware('permission:full|role_delete');
    });

    Route::group(['prefix' => 'permission'], function (){
        Route::get('',[Be\BePermissionController::class,'index'])->name('get_admin.permission.index')->middleware('permission:full|permission_index');
        Route::get('create',[Be\BePermissionController::class,'create'])->name('get_admin.permission.create')->middleware('permission:full|permission_store');
        Route::post('create',[Be\BePermissionController::class,'store'])->name('get_admin.permission.store');

        Route::get('update/{id}',[Be\BePermissionController::class,'edit'])->name('get_admin.permission.update')->middleware('permission:full|permission_update');
        Route::post('update/{id}',[Be\BePermissionController::class,'update'])->name('get_admin.permission.update');
        Route::get('delete/{id}',[Be\BePermissionController::class,'delete'])->name('get_admin.permission.delete')->middleware('permission:full|permission_delete');
    });
});
