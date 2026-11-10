import Link from "next/link";
import { amenityOrder, formatFcfa, rooms } from "@/lib/site";
import { Check } from "./Icons";

/** Side-by-side amenity matrix: what each category adds over the previous one. */
export default function RoomCompare() {
  return (
    <div className="card relative overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-sm">
        <caption className="sr-only">Comparatif des équipements par catégorie de chambre</caption>
        <thead>
          <tr className="border-b border-line text-left">
            <th scope="col" className="sticky left-0 bg-white p-4 font-bold text-mute md:p-5">Équipement</th>
            {rooms.map((r) => (
              <th key={r.id} scope="col" className="p-4 text-center align-bottom md:p-5">
                <span className="block font-display text-xl text-forest">{r.name.replace("Chambre ", "")}</span>
                <span className="mt-1 block text-xs font-semibold text-mute">{formatFcfa(r.price)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {amenityOrder.map((a) => (
            <tr key={a} className="border-b border-line/70 last:border-0 even:bg-sand/40">
              <th scope="row" className="sticky left-0 bg-inherit p-3 pl-4 text-left font-semibold md:pl-5">
                <span className="bg-white/0">{a}</span>
              </th>
              {rooms.map((r) => {
                const has = r.comforts.includes(a) || r.bathroom.includes(a);
                return (
                  <td key={r.id} className="p-3 text-center">
                    {has ? (
                      <>
                        <Check className="mx-auto text-leaf" />
                        <span className="sr-only">Inclus</span>
                      </>
                    ) : (
                      <>
                        <span aria-hidden className="text-line">—</span>
                        <span className="sr-only">Non inclus</span>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="sticky left-0 bg-white p-4" />
            {rooms.map((r) => (
              <td key={r.id} className="p-4 text-center">
                <Link href={`/reservation?chambre=${r.id}`} className="btn btn-forest !min-h-10 !px-4 !py-2 text-sm">
                  Réserver
                </Link>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
