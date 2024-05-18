<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class MediaController extends BaseController
{
    //
    public function index(Request $request)
    {
        try {
            $mediaQuery = Media::query();

            $mediaQuery->when($request->has('user_id'), function ($query) use ($request) {
                return $query->where('user_id', $request->user_id);
            });

            $mediaQuery->when($request->has('role'), function ($query) use ($request) {
                return $query->where('role', $request->role);
            });

            $media = $mediaQuery->get();

            foreach ($media as $m) {
                $m->url = asset('storage/' . $m->filepath);
            }

            return $this->sendResponse($media, 'Media retrieved successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'file' => 'required|file|mimes:jpeg,png,jpg,bmp|max:1024',
                'role' => 'required|string|in:admin,user',
                'user_id' => 'required|exists:users,id'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors(), 400);
            }

            $file = $request->file('file');
            $originalFileName = $file->getClientOriginalName();
            $file_name =  Str::slug(pathinfo($originalFileName, PATHINFO_FILENAME)) . '-' .  time() . '.' . $file->getClientOriginalExtension();

            $file_path = $file->storeAs('uploads/user-' . $request->user_id, $file_name, 'public');

            $media = Media::create([
                'user_id' => $request->user_id,
                'filename' => $originalFileName,
                'filepath' => $file_path,
                'role' => $request->role
            ]);

            $media->url = asset('storage/' . $media->filepath);

            return $this->sendResponse($media, 'Media created successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage());
        }
    }

    public function bulkStore()
    {
        try {
            $media = [];
            $files = request()->file('files');
            $role = request()->role;
            $user_id = request()->user_id;

            foreach ($files as $file) {
                $originalFileName = $file->getClientOriginalName();
                $file_name =  Str::slug(pathinfo($originalFileName, PATHINFO_FILENAME)) . '-' .  time() . '.' . $file->getClientOriginalExtension();

                $file_path = $file->storeAs('uploads/user-' . $user_id, $file_name, 'public');

                $media[] = Media::create([
                    'user_id' => $user_id,
                    'filename' => $originalFileName,
                    'filepath' => $file_path,
                    'role' => $role
                ]);
            }

            foreach ($media as $m) {
                $m->url = asset('storage/' . $m->filepath);
            }

            return $this->sendResponse($media, 'Media created successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            $media = Media::find($id);

            if (!$media) {
                return $this->sendError('Media not found', [], 404);
            }

            // delete file based on file_path
            $file_path = $media->filepath;
            $file_path = str_replace('storage/', '', $file_path);
            $file_path = storage_path('app/public/' . $file_path);

            if (file_exists($file_path)) {
                unlink($file_path);
            }

            $media->delete();

            return $this->sendResponse($media, 'Media deleted successfully');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }
}
