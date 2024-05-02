<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Http\Requests\Permission\CreatePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;
use Spatie\Permission\Models\Permission;

class PermissionController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $permissions = Permission::all();
            return $this->sendResponse($permissions, 'Permissions retrieved successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePermissionRequest $request)
    {
        try {
            $permission = Permission::create($request->all());
            return $this->sendResponse($permission, 'permission created successfully.', 201);
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        try {
            $permission = Permission::find($id);
            if (is_null($permission)) {
                return $this->sendError('Permission not found.');
            }
            return $this->sendResponse($permission, 'Permission retrieved successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, string $id)
    {
        //
        try {
            $permission = Permission::find($id);

            if (is_null($permission)) {
                return $this->sendError('Permission not found.');
            }

            $permission->update($request->all());

            return $this->sendResponse($permission, 'Permission updated successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        try {
            $permission = Permission::find($id);
            if (is_null($permission)) {
                return $this->sendError('Permission not found.');
            }
            $permission->delete();
            return $this->sendResponse($permission, 'Permission deleted successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }
}
