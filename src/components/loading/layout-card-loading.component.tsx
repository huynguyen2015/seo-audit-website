export default function LayoutCardLoadingComponent({ number = 1 }: any) {
  const pulseItem = (key: number) => (
    <div className="flex animate-pulse space-x-4" key={key}>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 rounded bg-slate-200"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-slate-200"></div>
            <div className="col-span-1 h-2 rounded bg-slate-200"></div>
          </div>
          <div className="h-2 rounded bg-slate-200"></div>
        </div>
      </div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 rounded bg-slate-200"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-slate-200"></div>
            <div className="col-span-1 h-2 rounded bg-slate-200"></div>
          </div>
          <div className="h-2 rounded bg-slate-200"></div>
        </div>
      </div>
    </div>
  );

  const loops = Array.from(Array(number).keys());
  return (
    <div className="mx-auto mb-4 w-full rounded-md border border-blue-300 p-4 shadow">
      {loops.map((item) => pulseItem(item))}
    </div>
  );
}
