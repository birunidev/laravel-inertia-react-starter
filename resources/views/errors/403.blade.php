@extends('layouts.base')

@section('content')
<div>
    <div class="flex items-center justify-center h-screen">
        <div class="text-center">
            <h1 class="text-9xl font-bold text-gray-800">403</h1>
            <h2 class="text-2xl font-semibold text-gray-600">Forbidden</h2>
            <p class="text-lg text-gray-500">You don't have permission to access this page.</p>
            <div class="mt-4">
                <a href="{{ route('dashboard.index') }}"
                    class="px-4 py-2.5 bg-blue-700 text-white rounded-xl inline-block hover:bg-blue-800 transition-all">
                    Go Back
                </a>
            </div>
        </div>
    </div>

</div>
@endsection