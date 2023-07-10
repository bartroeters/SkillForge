<?php

use App\Models\Lesson;
use App\Models\User;
use Carbon\Carbon;

$user = User::inRandomOrder()
    ->where('created_at', '<=', Carbon::now())
    ->first();

$lesson = Lesson::inRandomOrder()
    ->where('created_at', '<=', Carbon::now())
    ->first();

$timestamp = fake()->dateTimeBetween(
    max($user->created_at, $lesson->created_at),
    'now'
);

return [
    'userId' => $user,
    'lessonId' => $lesson,
    'timestamp' => $timestamp
];