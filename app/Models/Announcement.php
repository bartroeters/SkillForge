<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Announcement extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'courseId',
        'userId'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function announcer()
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
