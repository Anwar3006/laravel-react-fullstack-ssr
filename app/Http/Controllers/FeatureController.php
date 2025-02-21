<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\Upvote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currentUserId = Auth::id();

        $paginated = Feature::latest()
            ->withCount(['upvotes as upvote_count' => function ($query) {
                $query->select(DB::raw('COALESCE(SUM(CASE WHEN upvote = TRUE THEN 1 ELSE -1 END), 0)'));
            }])
            ->withExists([
                'upvotes as user_has_upvoted' => function ($query) use($currentUserId) {
                    $query->where('user_id', $currentUserId)->where('upvote', 1);
                },
                'upvotes as user_has_downvoted' => function ($query) use($currentUserId) {
                    $query->where('user_id', $currentUserId)->where('upvote', 0);
                }
            ])
            ->paginate();

        return Inertia::render('Feature/Index', [
            'features' => FeatureResource::collection($paginated)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Feature/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => ['required', 'string'],
            "description" => ['nullable', 'string'],
        ]);

        $data['user_id'] = Auth::id();

        Feature::create($data);

        return to_route('feature.index')->with('success', 'Feature created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        $currentUserId = Auth::id();
        $feat = Feature::withCount(['upvotes as upvote_count' => function ($query) {
                $query->select(DB::raw('COALESCE(SUM(CASE WHEN upvote = TRUE THEN 1 ELSE -1 END), 0)'));
            }])
            ->withExists([
                'upvotes as user_has_upvoted' => function ($query) use($currentUserId) {
                    $query->where('user_id', $currentUserId)->where('upvote', 1);
                },
                'upvotes as user_has_downvoted' => function ($query) use($currentUserId) {
                    $query->where('user_id', $currentUserId)->where('upvote', 0);
                }
            ])->find($feature->id);
        
        return Inertia::render('Feature/Show', [
            'feature' => new FeatureResource($feat)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        return Inertia::render('Feature/Edit', [
            'feature' => new FeatureResource($feature)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
        ]);
        
        $feature->update($data);

        return to_route('feature.index')->with('success', 'Feature updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();

        return to_route('feature.index')->with('success', 'Feature deleted successfully');
    }
}
