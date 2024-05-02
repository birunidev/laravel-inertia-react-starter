<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Http\Requests\Role\CreateRoleRequest;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;


class RoleController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $roles = Role::all();
            return $this->sendResponse($roles, 'Roles retrieved successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRoleRequest $request)
    {
        try {
            $role = Role::create($request->all());



            return $this->sendResponse($role, 'Role created successfully.', 201);
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
            $role = Role::with('permissions')->find($id);
            if (is_null($role)) {
                return $this->sendError('Role not found.');
            }
            return $this->sendResponse($role, 'Role retrieved successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        try {
            $role = Role::find($id);
            if (is_null($role)) {
                return $this->sendError('Role not found.');
            }
            $role->update($request->all());

            if ($request->has('permissions'))
                $role->syncPermissions($request->permissions);

            return $this->sendResponse($role, 'Role updated successfully.');
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
            $role = Role::find($id);
            if (is_null($role)) {
                return $this->sendError('Role not found.');
            }
            $role->delete();
            return $this->sendResponse($role, 'Role deleted successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }
}
