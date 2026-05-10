<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\RentalOrderItem;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController extends Controller
{
    use RespondsWithJson;

    public function index(Request $request)
    {
        return $this->success('Laporan berhasil dimuat', $this->rows($request)->get());
    }

    public function export(Request $request): StreamedResponse
    {
        $format = $request->query('format', 'csv');
        $rows = $this->rows($request)->get();
        $filename = 'laporan-rentphone-'.now()->format('YmdHis').($format === 'pdf' ? '.html' : '.csv');

        return response()->streamDownload(function () use ($rows, $format) {
            $out = fopen('php://output', 'w');
            if ($format === 'pdf') {
                fwrite($out, "<html><body><h1>Laporan RentPhone</h1><table border='1' cellspacing='0' cellpadding='6'><tr><th>Tanggal</th><th>Order</th><th>Customer</th><th>Kategori</th><th>Produk</th><th>Qty</th><th>Total</th><th>Status</th></tr>");
                foreach ($rows as $row) fwrite($out, '<tr><td>'.e($row->order_date).'</td><td>'.e($row->order_number).'</td><td>'.e($row->customer).'</td><td>'.e($row->category).'</td><td>'.e($row->product_name).'</td><td>'.e($row->quantity).'</td><td>'.e($row->subtotal).'</td><td>'.e($row->status).'</td></tr>');
                fwrite($out, '</table></body></html>');
                fclose($out);
                return;
            }
            fputcsv($out, ['Tanggal','Order','Customer','Kategori','Produk','Qty','Total','Status']);
            foreach ($rows as $row) fputcsv($out, [$row->order_date, $row->order_number, $row->customer, $row->category, $row->product_name, $row->quantity, $row->subtotal, $row->status]);
            fclose($out);
        }, $filename, ['Content-Type' => $format === 'pdf' ? 'text/html' : 'text/csv']);
    }

    private function rows(Request $request)
    {
        return RentalOrderItem::query()
            ->join('rental_orders', 'rental_order_items.rental_order_id', '=', 'rental_orders.id')
            ->join('users', 'rental_orders.user_id', '=', 'users.id')
            ->leftJoin('products', 'rental_order_items.product_id', '=', 'products.id')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->when($request->query('from'), fn ($query, $from) => $query->whereDate('rental_orders.created_at', '>=', $from))
            ->when($request->query('to'), fn ($query, $to) => $query->whereDate('rental_orders.created_at', '<=', $to))
            ->when($request->query('category_id'), fn ($query, $categoryId) => $query->where('categories.id', $categoryId))
            ->latest('rental_orders.created_at')
            ->selectRaw('DATE(rental_orders.created_at) as order_date, rental_orders.order_number, users.name as customer, COALESCE(categories.name, "Tanpa Kategori") as category, rental_order_items.product_name, rental_order_items.quantity, rental_order_items.subtotal, rental_orders.status');
    }
}
