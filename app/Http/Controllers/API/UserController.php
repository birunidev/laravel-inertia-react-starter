<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserController extends BaseController
{
    //
    public function index()
    {
        try {
            $users = User::all();
            return $this->sendResponse($users, 'Users retrieved successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    public function show($id)
    {
        $user = User::with('roles')->find($id);

        if (is_null($user)) {
            return $this->sendError('User not found.');
        }

        return $this->sendResponse($user, 'User retrieved successfully.');
    }

    public function store(CreateUserRequest $request)
    {
        $input = $request->all();

        $input['password'] = bcrypt($input['password']);

        $user = User::create($input);

        if ($request->has('roles')) {
            $user->syncRoles($request->roles);
        }

        return $this->sendResponse($user, 'User created successfully.');
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $input = $request->all();

        $user = User::find($id);
        if (is_null($user)) {
            return $this->sendError('User not found.');
        }

        $input['password'] = isset($input['password']) ? bcrypt($input['password']) : $user->password;

        $user->update($input);

        if ($request->has('roles')) {
            $user->syncRoles($request->roles);
        }

        return $this->sendResponse($user, 'User updated successfully.');
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (is_null($user)) {
            return $this->sendError('User not found.');
        }

        // delete folder associated with user id
        $path = storage_path('app/public/uploads/user-' . $user->id);

        if (Storage::disk('public')->has('uploads/user-' . $user->id)) {
            Storage::disk('public')->deleteDirectory('uploads/user-' . $user->id);
        }

        $user->delete();

        return $this->sendResponse($user, 'User deleted successfully.');
    }
}
