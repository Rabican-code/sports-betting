<?php

namespace App\Http\Controllers;

use App\Models\Sport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SportController extends Controller
{
    public function index(Request $request)
    {
        // Each sport carries only THIS user's bet (if any)
        $sports = Sport::with(['bets' => fn ($q) => $q->where('user_id', $request->user()->id)])
            ->latest()
            ->get();

        return Inertia::render('Sports/Index', ['sports' => $sports]);
    }

    public function show(Request $request, Sport $sport)
    {
        return Inertia::render('Sports/Show', [
            'sport' => $sport,
            'myBet' => $sport->bets()->where('user_id', $request->user()->id)->first(),
        ]);
    }
}
