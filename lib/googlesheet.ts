import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// 1. Definisikan Tipe Data
export interface GuestBookEntry {
  Nama: string;
  Komentar: string;
  Tanggal: string;
}

// Validasi Env Variables agar TS tidak komplain "undefined"
if (
  !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
  !process.env.GOOGLE_PRIVATE_KEY ||
  !process.env.GOOGLE_SHEET_ID
) {
  throw new Error("Google Sheets env variables are missing");
}

const privateKey = process.env.GOOGLE_PRIVATE_KEY
  ? process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n")
  : undefined;

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: privateKey, // Gunakan variabel yang sudah dibersihkan di atas
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const getSheetData = async (): Promise<GuestBookEntry[]> => {
  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEET_ID as string,
    serviceAccountAuth
  );

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    // Mapping data row ke Interface GuestBookEntry
    const data: GuestBookEntry[] = rows.map((row) => ({
      Nama: row.get("Nama"),
      Komentar: row.get("Komentar"),
      Tanggal: row.get("Tanggal"),
    }));

    return data;
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return [];
  }
};

export const addSheetRow = async (rowData: GuestBookEntry) => {
  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEET_ID as string,
    serviceAccountAuth
  );

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow(rowData as any);
    return true;
  } catch (error) {
    console.error("Error adding row:", error);
    return false;
  }
};
