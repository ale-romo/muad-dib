import fs from 'fs/promises'; // Use promises API for async file operations
import path from 'path';
import * as XLSX from 'xlsx';

// Resolve the directory of the current module
const __dirname = new URL('.', import.meta.url).pathname;

// Path to your Excel file in the /assets directory
const excelFilePath = path.join(__dirname, '../assets', 'test.xlsx');

// Path to the output JavaScript file
const outputFilePath = path.join(__dirname, '/', 'content.js');
function replaceSpacesWithUnderscores(input) {
  return input.replace(/ /g, '_');
}

// Function to generate static content
const generateStaticContent = async () => {
  try {
    const fileBuffer = await fs.readFile(excelFilePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    let worksheets = {}
    for (const sheetName of workbook.SheetNames) {
      worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }

    const worksheetsString = Object.entries(worksheets).map(([sheetName, rows]) => {
      const rowsString = rows.map(row =>
        `{ ${Object.entries(row).map(([key, value]) =>
          `${replaceSpacesWithUnderscores(key)}: ${JSON.stringify(value)}`
        ).join(', ')} }`
      ).join(',\n');

      return `${replaceSpacesWithUnderscores(sheetName)}: [\n${rowsString}\n]`;
    }).join(',\n');

    const jsContent = `
      const data = {
        ${worksheetsString}
      };
      export default data;
    `;

    // Save the JavaScript file
    await fs.writeFile(outputFilePath, jsContent);
    console.log('JavaScript file with Excel data generated successfully.');

  } catch (error) {
    console.error('Error generating static content:', error);
  }
};

// Run the function
generateStaticContent();
