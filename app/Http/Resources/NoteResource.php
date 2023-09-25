<?php

declare(strict_types = 1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NoteResource extends JsonResource
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
            'lessonId' => $this->lesson_id,
            'userId' => $this->user_id,
            'content' => $this->content,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}
