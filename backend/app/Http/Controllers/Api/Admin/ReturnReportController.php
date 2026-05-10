<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\ReturnReport;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReturnReportController extends Controller
{
    use RespondsWithJson;
    public function index() { return $this->success('Laporan berhasil dimuat', ReturnReport::with(['user','rentalOrder.items'])->latest()->get()); }
    public function show(ReturnReport $returnReport) { return $this->success('Laporan berhasil dimuat', $returnReport->load(['user','rentalOrder.items'])); }
    public function updateStatus(Request $request, ReturnReport $returnReport) { $data=$request->validate(['status'=>['required',Rule::in(['submitted','reviewed','accepted','rejected'])],'admin_notes'=>'nullable|string']); $returnReport->update($data); return $this->success('Status laporan berhasil diperbarui', $returnReport->fresh()); }
}
