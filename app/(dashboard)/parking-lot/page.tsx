import { ParkingCircle } from 'lucide-react';

export default function ParkingLotPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Parking Lot</h1>
        <p className="text-sm text-slate-500 mt-1">Deferred items awaiting reactivation or cancellation</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <ParkingCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Parking Lot Empty</h3>
        <p className="text-sm text-slate-500">Items moved to the parking lot will appear here</p>
      </div>
    </div>
  );
}
