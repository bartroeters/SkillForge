<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfilePictureController;

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

Route::post('login', [AuthController::class, 'login']);
Route::post('send-email-reset-password', [AuthController::class, 'resetPasswordRequest']);
Route::post('reset-password', [AuthController::class, 'updatePassword']);
Route::post('register', [AuthController::class, 'register']);

Route::resource('courses', CourseController::class);
Route::resource('categories', CategoryController::class);
Route::resource('users', UserController::class);
Route::resource('lessons', LessonController::class);
Route::resource('announcements', AnnouncementController::class);
Route::resource('reviews', ReviewController::class);
Route::resource('sources', SourceController::class);

Route::middleware(['auth'])->group(function () {
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
});

Route::post('/upload-profile-picture', [ProfilePictureController::class, 'uploadProfilePicture'])->name('upload.profile.picture');