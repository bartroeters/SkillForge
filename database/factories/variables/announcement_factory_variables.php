<?php

use App\Models\User;
use Carbon\Carbon;

$user = User::inRandomOrder()
    ->where('created_at', '<=', Carbon::now())
    ->first();

$timestamp = fake()->dateTimeBetween(max($user->created_at), 'now');

return [
    'user' => $user,
    'timestamp' => $timestamp
];