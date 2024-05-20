<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::insert([
            [
                'name' => 'find-all-user',
                'display_name' => 'Find All User',
                'group_name' => 'User',
                'guard_name' => 'web'
            ],
            [
                'name' => 'find-user',
                'display_name' => 'Find User',
                'group_name' => 'User',
                'guard_name' => 'web'
            ], [
                'name' => 'create-user',
                'display_name' => 'Create User',
                'group_name' => 'User',
                'guard_name' => 'web'
            ], [
                'name' => 'edit-user',
                'display_name' => 'Edit User',
                'group_name' => 'User',
                'guard_name' => 'web'
            ], [
                'name' => 'delete-user',
                'display_name' => 'Delete User',
                'group_name' => 'User',
                'guard_name' => 'web'
            ],
        ]);
    }
}
