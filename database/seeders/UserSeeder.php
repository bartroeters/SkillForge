<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder {
    public function run() {
        User::create([
            'first_name' => 'Henk',
            'last_name' => 'Steen',
            'email' => 'henksteen@mail.com',
            'password' => 'bamischijf',
            'is_admin' => true,
            'remember_token' => Str::random(10)
        ]);

        User::factory(120)->create();
    }
}