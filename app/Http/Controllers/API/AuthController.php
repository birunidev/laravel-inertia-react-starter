<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends BaseController
{
    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->only('email', 'password');

            if (!auth()->attempt($credentials)) {
                return $this->sendError('Unauthorized', [], 401);
            }

            $user = auth()->user();
            $token = $user->createToken('authToken')->plainTextToken;

            return $this->sendResponse([
                'user' => $user,
                'access_token' => $token
            ], 'User logged in successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }

    public function register(RegisterRequest $request)
    {
        try {
            $input = $request->all();
            $input['password'] = bcrypt($input['password']);

            $user = User::create($input);
            $token = $user->createToken('authToken')->plainTextToken;

            return $this->sendResponse([
                'user' => $user,
                'access_token' => $token
            ], 'User registered successfully.');
        } catch (\Throwable $th) {
            //throw $th;
            return $this->sendError('Error', $th->getMessage(), 500);
        }
    }
}
