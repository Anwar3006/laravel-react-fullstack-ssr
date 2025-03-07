<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', "/dashboard");


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified', 'role:'.RolesEnum::Admin->value])->group(function () {
        Route::get('/user', [UserController::class, 'index'])->name('user.index');
        Route::get('/user/{user}', [UserController::class, 'edit'])->name('user.edit');
        Route::patch('/user/{user}', [UserController::class, 'update'])->name('user.update');
    });

    Route::middleware(['verified', sprintf('role:%s|%s|%s', 
                                                RolesEnum::Admin->value, 
                                                RolesEnum::Commenter->value, 
                                                RolesEnum::User->value)])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        //Except for index and show routes, all users need to have the right permission in order to access thr route
        Route::resource('feature', FeatureController::class)->except(['index', 'show'])->middleware('can:'.PermissionsEnum::ManageFeatures->value);
        Route::get('/feature', [FeatureController::class, 'index'])->name('feature.index');
        Route::get('/feature/{feature}', [FeatureController::class, 'show'])->name('feature.show');

        Route::post('/feature/{feature}/upvote', [UpvoteController::class, 'store'])->name('upvote.store');
        Route::delete('/feature/{feature}/upvote', [UpvoteController::class, 'destroy'])->name('upvote.destroy');

        Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])
            ->middleware('can:'.PermissionsEnum::ManageComments->value)->name('comment.store');
        Route::delete('/feature/{feature}/comments/{comment}', [CommentController::class, 'destroy'])
            ->middleware('can:'.PermissionsEnum::ManageComments->value)->name('comment.destroy');
    });
});

require __DIR__.'/auth.php';
