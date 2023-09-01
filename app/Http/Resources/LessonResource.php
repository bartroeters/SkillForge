<?php

declare(strict_types = 1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'tutorId' => $this->tutorId,
            'title' => $this->title,
            'description' => $this->description,
            'textContent' => $this->text_content,
            'videoContent' => $this->video_content,
            'createdAt' => $this->created_at,
            'courseIds' => $this->courses->pluck('id'),
            'sourceIds' => $this->sources->pluck('id'),
        ];
    }
}