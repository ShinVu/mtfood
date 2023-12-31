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
        Route::get('show/{id}',[Be\BeOrderController::class,'show'])->name('get_admin.order.show');
        Route::get('show/GHN/{id}',[Be\BeOrderController::class,'sendGHN'])->name('get_admin.order.sendGHN');
        Route::get('show/Aprove/{id}',[Be\BeOrderController::class,'update'])->name('get_admin.order.update');
        Route::get('show/Detroy/{id}',[Be\BeOrderController::class,'detroy'])->name('get_admin.order.detroy');

        Route::get('offline',[Be\BeOrderController::class,'indexOffline'])->name('get_admin.order.indexOffline');
        Route::get('offline/show/{id}',[Be\BeOrderController::class,'showOffline'])->name('get_admin.order.showOffline');
        Route::get('offline/create',[Be\BeOrderController::class,'createOffline'])->name('get_admin.order.createOffline');
        Route::post('offline/create',[Be\BeOrderController::class,'storeOffline'])->name('get_admin.order.storeOffline');


        Route::get('wholesale',[Be\BeOrderController::class,'indexWholesale'])->name('get_admin.order.indexWholesale');
        Route::get('wholesale/show/{id}',[Be\BeOrderController::class,'showWholesale'])->name('get_admin.order.showWholesale');
        Route::get('wholesale/show2/{id}',[Be\BeOrderController::class,'showWholesale2'])->name('get_admin.order.showWholesale2');
        Route::post('wholesale/show2/{id}',[Be\BeOrderController::class,'createWholesale2'])->name('get_admin.order.createWholesale2');
        Route::get('wholesale/show2/GHN/{id}',[Be\BeOrderController::class,'sendGHNWholesale'])->name('get_admin.order.sendGHNWholesale');
        Route::get('wholesale/show2/Aprove/{id}',[Be\BeOrderController::class,'updateWholesale'])->name('get_admin.order.updateWholesale');
        Route::get('wholesale/show2/Detroy/{id}',[Be\BeOrderController::class,'detroyWholesale'])->name('get_admin.order.detroyWholesale');
        Route::get('wholesale/show2/Finished/{id}',[Be\BeOrderController::class,'updateFinished'])->name('get_admin.order.updateFinished');

        Route::get('show/debt0/{id}',[Be\BeOrderController::class,'updateDebt0'])->name('get_admin.order.updateDebt0');
        Route::get('show/debt1/{id}',[Be\BeOrderController::class,'updateDebt1'])->name('get_admin.order.updateDebt1');


        Route::get('print/{id}',[Be\BeOrderController::class,'print'])->name('get_admin.order.print');


        Route::get('wholesale/debt',[Be\BeOrderController::class,'indexDebt'])->name('get_admin.order.indexDebt');
        Route::get('wholesale/debt/{id}',[Be\BeOrderController::class,'payDebt'])->name('get_admin.order.payDebt');
    });

    Route::group(['prefix' => 'product'], function (){
        Route::get('',[Be\BeProductController::class,'index'])->name('get_admin.product.index');
        Route::get('productexists',[Be\BeProductController::class,'indexExists'])->name('get_admin.product.indexExists');

        Route::get('create',[Be\BeProductController::class,'create'])->name('get_admin.product.create');
        Route::post('create',[Be\BeProductController::class,'store']);

        Route::get('update/{id}',[Be\BeProductController::class,'edit'])->name('get_admin.product.update');
        Route::post('update/{id}',[Be\BeProductController::class,'update']);

        Route::get('delete/{id}',[Be\BeProductController::class,'delete'])->name('get_admin.product.delete');
        Route::get('delete',[Be\BeProductController::class,'deleteImage'])->name('get_admin.product.delete_image');
    });

    Route::group(['prefix' => 'chat'], function (){
        Route::get('',[Be\BeChatProductController::class,'index'])->name('get_admin.chat.index');
    });

    Route::group(['prefix' => 'user'], function (){
        Route::get('',[Be\BeUserController::class,'index'])->name('get_admin.user.index');
        Route::get('create',[Be\BeUserController::class,'create'])->name('get_admin.user.create');
        Route::post('create',[Be\BeUserController::class,'store'])->name('get_admin.user.store');

        //Route::get('update/{id}',[Be\BeUserController::class,'edit'])->name('get_admin.user.update');
        Route::post('update/{id}',[Be\BeUserController::class,'update'])->name('get_admin.user.update');
        Route::get('delete/{id}',[Be\BeUserController::class,'delete'])->name('get_admin.user.delete');
    });

    Route::group(['prefix' => 'category'], function (){
        Route::get('',[Be\BeCategoryController::class,'index'])->name('get_admin.category.index');
        Route::get('create',[Be\BeCategoryController::class,'create'])->name('get_admin.category.create');
        Route::post('create',[Be\BeCategoryController::class,'store']);

        Route::get('update/{id}',[Be\BeCategoryController::class,'edit'])->name('get_admin.category.update');
        Route::post('update/{id}',[Be\BeCategoryController::class,'update']);

        Route::get('delete/{id}',[Be\BeCategoryController::class,'delete'])->name('get_admin.category.delete');
    });

    Route::group(['prefix' => 'admin'], function (){
        Route::get('',[Be\BeAdminController::class,'index'])->name('get_admin.admin.index');
    });
    Route::group(['prefix' => 'role'], function (){
        Route::get('',[Be\BeRoleController::class,'index'])->name('get_admin.role.index');
        Route::get('create',[Be\BeRoleController::class,'create'])->name('get_admin.role.create');
        Route::post('create',[Be\BeRoleController::class,'store'])->name('get_admin.role.store');

        //Route::get('update/{id}',[Be\BeRoleController::class,'edit'])->name('get_admin.role.update');
        Route::post('update/{id}',[Be\BeRoleController::class,'update'])->name('get_admin.role.update');
        Route::get('delete/{id}',[Be\BeRoleController::class,'delete'])->name('get_admin.role.delete');
    });

    Route::group(['prefix' => 'permission'], function (){
        Route::get('',[Be\BePermissionController::class,'index'])->name('get_admin.permission.index');
        Route::get('create',[Be\BePermissionController::class,'create'])->name('get_admin.permission.create');
        Route::post('create',[Be\BePermissionController::class,'store'])->name('get_admin.permission.store');

        //Route::get('update/{id}',[Be\BePermissionController::class,'edit'])->name('get_admin.permission.update');
        Route::post('update/{id}',[Be\BePermissionController::class,'update'])->name('get_admin.permission.update');
        Route::get('delete/{id}',[Be\BePermissionController::class,'delete'])->name('get_admin.permission.delete');
    });

    Route::group(['prefix' => 'wholesale'], function (){
        Route::get('/wholesaleApprove',[Be\BeWholesaleController::class,'indexWholesaleApprove'])->name('get_admin.wholesale.indexWholesaleApprove');
        Route::get('update/{id}',[Be\BeWholesaleController::class,'updateWholesaleApprove'])->name('get_admin.wholesale.updateWholesaleApprove');
    });

    Route::group(['prefix' => 'brand'], function (){
        Route::get('',[Be\BeBrandController::class,'index'])->name('get_admin.brand.index');
        Route::get('create',[Be\BeBrandController::class,'create'])->name('get_admin.brand.create');
        Route::post('create',[Be\BeBrandController::class,'store']);

        Route::get('update/{id}',[Be\BeBrandController::class,'edit'])->name('get_admin.brand.update');
        Route::post('update/{id}',[Be\BeBrandController::class,'update']);

        Route::get('delete/{id}',[Be\BeBrandController::class,'delete'])->name('get_admin.brand.delete');
    });

    Route::group(['prefix' => 'inventory'], function (){
        Route::get('',[Be\BeInventoryController::class,'index'])->name('get_admin.inventory.index');

        Route::get('create',[Be\BeInventoryController::class,'create'])->name('get_admin.inventory.create');
        Route::post('create',[Be\BeInventoryController::class,'store'])->name('get_admin.inventory.store');

        Route::get('show/{id}',[Be\BeInventoryController::class,'show'])->name('get_admin.inventory.show');

        Route::get('print/{id}',[Be\BeInventoryController::class,'print'])->name('get_admin.inventory.print');
    });
});
