<?php

use App\Http\Controllers\Admin\PermissionCrudController;
use App\Http\Controllers\Admin\PermissionGroupCrudController;
use App\Http\Controllers\Admin\RoleCrudController;
use App\Http\Controllers\Admin\UserCrudController;
use App\Http\Controllers\MediaCrudController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->prefix('dashboard')->as('dashboard.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('index');


    Route::resource('users', UserCrudController::class)->names([
        'index' => 'users',
        'create' => 'users.create',
        'store' => 'users.store',
        'show' => 'users.show',
        'edit' => 'users.edit',
        'update' => 'users.update',
        'destroy' => 'users.destroy',
    ]);

    Route::resource('roles', RoleCrudController::class)->names([
        'index' => 'roles',
        'create' => 'roles.create',
        'store' => 'roles.store',
        'show' => 'roles.show',
        'edit' => 'roles.edit',
        'update' => 'roles.update',
        'destroy' => 'roles.destroy',
    ]);
    Route::resource('permissions', PermissionCrudController::class)->names([
        'index' => 'permissions',
        'create' => 'permissions.create',
        'store' => 'permissions.store',
        'show' => 'permissions.show',
        'edit' => 'permissions.edit',
        'update' => 'permissions.update',
        'destroy' => 'permissions.destroy',
    ]);
    Route::resource('permission-groups', PermissionGroupCrudController::class)->names([
        'index' => 'permission-groups',
        'create' => 'permission-groups.create',
        'store' => 'permission-groups.store',
        'show' => 'permission-groups.show',
        'edit' => 'permission-groups.edit',
        'update' => 'permission-groups.update',
        'destroy' => 'permission-groups.destroy',
    ]);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/media', [MediaCrudController::class, 'index'])->name('media.index');
});




Route::prefix('region')->group(function () {
    Route::get('/provinces', [RegionController::class, 'provinces']);
    Route::get('/regencies/{province_id}', [RegionController::class, 'regencies']);
    Route::get('/districts/{regency_id}', [RegionController::class, 'districts']);
    Route::get('/villages/{district_id}', [RegionController::class, 'villages']);
});

require __DIR__ . '/auth.php';
