<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class getProductByFilterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category' => 'nullable|sometimes',
            'tag' => 'nullable|sometimes',
            'price' => 'nullable|sometimes',
            'service' => 'nullable|sometimes',
            'rating' => 'nullable|sometimes',
            'sort' => 'nullable|sometimes',
            'offset' => 'nullable|sometimes',
            'limit' => 'nullable|sometimes'
        ];
    }
}
