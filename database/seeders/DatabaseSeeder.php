<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            CourseSeeder::class,
            SourceSeeder::class,
            LessonSeeder::class,
            ReviewSeeder::class,
            AnnouncementSeeder::class,
            NoteSeeder::class
        ]);
    }
}
