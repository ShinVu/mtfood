<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class createOrderWholesaleRequest extends FormRequest
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
            'products' => 'required',
            'payment_method' => 'required',
            'delivery_method' => 'required',
            'notes' => 'sometimes',
            'customer_id' => 'required',
            'delivery_address_id' => 'required',

        ];
    }
}
