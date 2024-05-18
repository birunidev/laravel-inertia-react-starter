<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaCrudController extends Controller
{
    //
    public function index()
    {
        $medias = Media::paginate(10);

        return Inertia::render('Dashboard/Media/Index', [
            'medias' => $medias
        ]);
    }
}
