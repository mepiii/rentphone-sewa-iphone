<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\RentalOrder;
use App\Models\ReturnReport;
use Illuminate\Http\Request;

class ReturnReportController extends Controller
{
    use RespondsWithJson;
    public function index(Request $request) { return $this->success('Laporan berhasil dimuat', $request->user()->returnReports()->with('rentalOrder')->latest()->get()); }
    public function show(Request $request, ReturnReport $returnReport) { abort_if($returnReport->user_id !== $request->user()->id, 403); return $this->success('Laporan berhasil dimuat', $returnReport->load('rentalOrder')); }
    public function store(Request $request)
    {
        $data = $request->validate(['rental_order_id'=>'required|exists:rental_orders,id','reason'=>'nullable|string','condition_notes'=>'nullable|string','image'=>'nullable|string']);
        $order = RentalOrder::findOrFail($data['rental_order_id']);
        abort_if($order->user_id !== $request->user()->id, 403);
        $report = ReturnReport::create([...$data, 'user_id'=>$request->user()->id, 'status'=>'submitted']);
        $order->update(['status'=>'returned']);
        return $this->success('Laporan pengembalian berhasil dikirim', ['return_report_id'=>$report->id,'status'=>$report->status], 201);
    }
}
