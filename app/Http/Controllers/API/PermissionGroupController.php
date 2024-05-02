<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Models\PermissionGroup;
use Illuminate\Http\Request;

class PermissionGroupController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $permissionGroups = PermissionGroup::with('permissions')->get();
            return $this->sendResponse($permissionGroups, 'Permission groups retrieved successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $permissionGroup = PermissionGroup::create($request->all());
            return $this->sendResponse($permissionGroup, 'Permission group created successfully.', 201);
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $permissionGroup = PermissionGroup::with('permissions')->find($id);
            if (is_null($permissionGroup)) {
                return $this->sendError('Permission group not found.');
            }
            return $this->sendResponse($permissionGroup, 'Permission group retrieved successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $permissionGroup = PermissionGroup::find($id);
            if (is_null($permissionGroup)) {
                return $this->sendError('Permission group not found.');
            }
            $permissionGroup->update($request->all());
            return $this->sendResponse($permissionGroup, 'Permission group updated successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $permissionGroup = PermissionGroup::find($id);
            if (is_null($permissionGroup)) {
                return $this->sendError('Permission group not found.');
            }
            $permissionGroup->delete();
            return $this->sendResponse(null, 'Permission group deleted successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }
}
