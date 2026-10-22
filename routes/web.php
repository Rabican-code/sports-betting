<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\SportController as AdminSportController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SportController;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\BetController as AdminBetController;
use App\Http\Controllers\BetController;

// ---------- Page 3: user login on / ----------
Route::get('/', [AuthenticatedSessionController::class, 'create'])
    ->middleware('guest')
    ->name('home');

// After login, send people to the right place
Route::get('/dashboard', function () {
    return redirect()->route(auth()->user()->is_admin ? 'admin.sports.index' : 'sports.index');
})->middleware('auth')->name('dashboard');

// ---------- Page 4: users (read-only) ----------
Route::middleware('auth')->group(function () {
    Route::get('/sports', [SportController::class, 'index'])->name('sports.index');
    Route::get('/sports/{sport}', [SportController::class, 'show'])->name('sports.show');
    Route::post('/sports/{sport}/bets', [BetController::class, 'store'])->name('bets.store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ---------- Page 1: admin login ----------
Route::get('/admin', [AdminAuthController::class, 'create'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('admin.login.store');

// ---------- Page 2: admin only ----------
Route::prefix('admin')->name('admin.')->middleware(EnsureUserIsAdmin::class)->group(function () {
    Route::get('/bets', [AdminBetController::class, 'index'])->name('bets.index');
    Route::post('/sports/{sport}/result', [AdminSportController::class, 'result'])->name('sports.result');
    Route::get('/sports', [AdminSportController::class, 'index'])->name('sports.index');
    Route::post('/sports', [AdminSportController::class, 'store'])->name('sports.store');
    Route::post('/logout', [AdminAuthController::class, 'destroy'])->name('logout');
});

require __DIR__ . '/auth.php';
