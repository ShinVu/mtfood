<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateProductRequest extends FormRequest
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
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'exp_date' => 'required',
            'directionForPreservation' => 'required',
            'directionForUse' => 'required',
            'weight' => 'required',
            'pack' => 'required',
            'ingredient' => 'required',
            'is_wholesale' => 'required',
            'category' => 'required',
            'images' => 'sometimes'
        ];
    }
}
