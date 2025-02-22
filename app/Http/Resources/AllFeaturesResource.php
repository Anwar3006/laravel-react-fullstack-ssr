<?php

namespace App\Http\Resources;

use App\Models\Upvote;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AllFeaturesResource extends JsonResource
{
    //to remove the data field and return the object directly
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'user' => $this->user,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'upvote_count' => $this->upvote_count,
            'user_has_upvoted' => $this->user_has_upvoted,
            'user_has_downvoted' => $this->user_has_downvoted,
        ];
    }
}
