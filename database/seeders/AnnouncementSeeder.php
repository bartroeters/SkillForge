<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Course::all();

        foreach ($courses as $course) {
            Announcement::factory(rand(3, 7))->create([
                'course_id' => $course->id
            ]);
        }
    }
}
