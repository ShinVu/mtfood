<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use App\Models\Wholesale;
use App\Models\Account;
use Illuminate\Http\Request;

class BeWholesaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $data = Wholesale::join('users', 'wholesale.account_id', '=', 'users.id')
        //     ->where('users.wholesale', 0)
        //     ->get();

        // $viewData = [
        //     'wholesales' => $data
        // ];

        // return view('be.wholesale.wholesaleApprove', $viewData);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Wholesale $wholesale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wholesale $wholesale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $account_id)
    {
        // User::where(['id' => $account_id])
        //     ->update(['wholesale' => 1]);
        //     //dd(123);
        // return redirect()->route('get_admin.wholesale.wholesaleApprove');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wholesale $wholesale)
    {
        //
    }

    public function indexWholesaleApprove()
    {
        $data = Wholesale::join('account', 'wholesale.account_id', '=', 'account.account_id')
            ->where('account.wholesale', 0)
            ->get();

        $viewData = [
            'wholesales' => $data
        ];

        return view('be.wholesale.wholesaleApprove', $viewData);
    }

    public function updateWholesaleApprove(Request $request, $account_id)
    {
        Account::find($account_id)
            ->update(['wholesale' => 1]);
            //dd(123);
        return redirect()->route('get_admin.wholesale.indexWholesaleApprove');
    }
}
