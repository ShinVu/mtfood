<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\SendEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::controller(AuthController::class)->group(function () {
    Route::post('/signup', 'signup');

    Route::post('/login', 'login');

    Route::post('/googleLogin', 'googleLogin');

    Route::post('/facebookLogin', 'facebookLogin');

    Route::post('/logout', 'logout');

    Route::post('/verifyCode', 'verifyCode');

    Route::post('/addPassword', 'addPassword');
});

Route::controller(SendEmailController::class)->group(function () {
    Route::post('/mailVerification', 'mailVerification');

    Route::post('/mailResetPassword', 'mailResetPassword');
});

Route::controller(ProductController::class)->group(function () {
    Route::get('/product', 'product');
    Route::get('/category', 'category');
    Route::get('/tag', 'tag');
    Route::get('/productNew', 'productNew');
    Route::get('/productMostLiked', 'productMostLiked');
    Route::get('/productDiscount', 'productDiscount');
    Route::get('/productDetail', 'productDetail');
    Route::get('/imageReviews', 'getProductImageReview');
    Route::get('/productReviews', 'getProductReview');
    Route::get('/productByCategory', 'getProductByCategory');
    Route::get('/productByFilter', 'getProductByFilter');
    Route::get('/productSearch', 'getProductByKeyword');
});

Route::controller(ProfileController::class)->group(function () {
    Route::post('/updateProfile', 'updateProfile');
    Route::post('/changePassword', 'changePassword');
    Route::post('/addAddress', 'addAddress');
    Route::get('/getProvince', 'getProvince');
    Route::get('/getDistrict', 'getDistrict');
    Route::get('/getWard', 'getWard');
});
