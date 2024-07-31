import fs from 'fs/promises'; // Use promises API for async file operations
import path from 'path';
import * as XLSX from 'xlsx';

// Resolve the directory of the current module
const __dirname = new URL('.', import.meta.url).pathname;

// Path to your Excel file in the /assets directory
const excelFilePath = path.join(__dirname, '../assets', 'data.xlsx');

// Path to the output JavaScript file
const outputFilePath = path.join(__dirname, '/', 'content.js');
function replaceSpacesWithUnderscores(input) {
  return input.replace(/ /g, '_');
}

// Utility function to check if a row is empty
const isEmptyRow = (row) => row.every(cell => cell === undefined || cell === null || String(cell).trim() === '');

// Function to generate static content
const generateStaticContent = async () => {
  try {

    const fileBuffer = await fs.readFile(excelFilePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const worksheets = {};
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const filteredRows = rows.filter(row => !isEmptyRow(row));

      worksheets[sheetName] = filteredRows;
    });

    const worksheetsString = Object.entries(worksheets).map(([sheetName, rows]) => {
      const rowsString = rows.map(row =>
        Array.isArray(row)
          ? `[${row.map(value => JSON.stringify(value)).join(', ')}]`
          : JSON.stringify(row)
      ).join(',\n');

      return `${replaceSpacesWithUnderscores(sheetName)}: [\n${rowsString}\n]`;
    }).join(',\n');

    const jsContent = `
export const data = {
      ${worksheetsString}
  };`;

    // Save the JavaScript file
    await fs.writeFile(outputFilePath, jsContent);
    console.log('JavaScript file with Excel data generated successfully.');

  } catch (error) {
    console.error('Error generating static content:', error);
  }
};

// Run the function
generateStaticContent();
