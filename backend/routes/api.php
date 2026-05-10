<?php

use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DeliveryMethodController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentMethodController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductReviewController;
use App\Http\Controllers\Api\ReturnReportController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('admin/login', [AuthController::class, 'adminLogin']);
Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);

Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/{category}', [CategoryController::class, 'show']);
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{product}', [ProductController::class, 'show']);
Route::get('products/{product}/reviews', [ProductReviewController::class, 'index']);
Route::get('delivery-methods', [DeliveryMethodController::class, 'index']);
Route::get('payment-methods', [PaymentMethodController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    Route::patch('me', [AuthController::class, 'updateMe']);
    Route::post('products/{product}/reviews', [ProductReviewController::class, 'store']);
    Route::get('favorites', [FavoriteController::class, 'index']);
    Route::post('favorites/{product}', [FavoriteController::class, 'store']);
    Route::delete('favorites/{product}', [FavoriteController::class, 'destroy']);
    Route::apiResource('addresses', AddressController::class)->except(['show']);
    Route::apiResource('orders', OrderController::class)->only(['index', 'store', 'show']);
    Route::apiResource('returns', ReturnReportController::class)->only(['index', 'store', 'show']);
});

Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    Route::get('dashboard', App\Http\Controllers\Api\Admin\DashboardController::class);
    Route::apiResource('categories', App\Http\Controllers\Api\Admin\CategoryController::class);
    Route::apiResource('products', App\Http\Controllers\Api\Admin\ProductController::class);
    Route::get('customers', [App\Http\Controllers\Api\Admin\CustomerController::class, 'index']);
    Route::get('customers/{user}', [App\Http\Controllers\Api\Admin\CustomerController::class, 'show']);
    Route::delete('customers/{user}', [App\Http\Controllers\Api\Admin\CustomerController::class, 'destroy']);
    Route::get('reports', [App\Http\Controllers\Api\Admin\ReportController::class, 'index']);
    Route::get('reports/export', [App\Http\Controllers\Api\Admin\ReportController::class, 'export']);
    Route::get('orders', [App\Http\Controllers\Api\Admin\OrderController::class, 'index']);
    Route::get('orders/{order}', [App\Http\Controllers\Api\Admin\OrderController::class, 'show']);
    Route::patch('orders/{order}/status', [App\Http\Controllers\Api\Admin\OrderController::class, 'updateStatus']);
    Route::get('returns', [App\Http\Controllers\Api\Admin\ReturnReportController::class, 'index']);
    Route::get('returns/{returnReport}', [App\Http\Controllers\Api\Admin\ReturnReportController::class, 'show']);
    Route::patch('returns/{returnReport}/status', [App\Http\Controllers\Api\Admin\ReturnReportController::class, 'updateStatus']);
    Route::get('profile', [App\Http\Controllers\Api\Admin\ProfileController::class, 'show']);
    Route::patch('profile', [App\Http\Controllers\Api\Admin\ProfileController::class, 'update']);
});
