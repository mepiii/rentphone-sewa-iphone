<?php

namespace App\Http\Controllers\Api\Concerns;

trait RespondsWithJson
{
    protected function success(string $message, mixed $data = null, int $status = 200): \Illuminate\Http\JsonResponse
    {
        $payload = ['success' => true, 'message' => $message];
        if ($data !== null) $payload['data'] = $data;
        return response()->json($payload, $status);
    }

    protected function error(string $message, mixed $errors = null, int $status = 422): \Illuminate\Http\JsonResponse
    {
        $payload = ['success' => false, 'message' => $message];
        if ($errors !== null) $payload['errors'] = $errors;
        return response()->json($payload, $status);
    }
}
