import { getSheetData, GuestBookEntry } from "@/lib/googlesheet";
import GuestbookForm from "@/components/spreadsheet/form";

// Opsi konfigurasi Route Segment
export const dynamic = "force-dynamic";

export default async function Home() {
  // TS akan tahu bahwa 'comments' adalah array of GuestBookEntry
  const comments: GuestBookEntry[] = await getSheetData();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Buku Tamu (TypeScript)
        </h1>

        <GuestbookForm />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Komentar Terbaru ({comments.length})
          </h3>

          {comments.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              Belum ada komentar.
            </p>
          ) : (
            comments.map((item, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-800 text-lg">
                    {item.Nama}
                  </h4>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {item.Tanggal}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.Komentar}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
