import fs from 'fs/promises'; // Use promises API for async file operations
import path from 'path';
import * as XLSX from 'xlsx';

// Resolve the directory of the current module
const __dirname = new URL('.', import.meta.url).pathname;

// Path to your Excel file in the /assets directory
const excelFilePath = path.join(__dirname, '../assets', 'test.xlsx');

// Path to the output JavaScript file
// const outputFilePath = path.join(__dirname, '/', 'generatedData.js');

// Function to generate static content
const generateStaticContent = async () => {
  try {
    const fileBuffer = await fs.readFile(excelFilePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    console.log(workbook)
  //   let worksheets = {}
    // for (const sheetName of workbook.sheetNames) {
    //   console.log(sheetName)
    //   // worksheets[sheetName] = XLSX.utils.sheets_to_json(workbook.Sheets[sheetName]);
    // }
  //   console.log("json:\n", JSON.stringify(worksheets.Sheet1), "\n\n");
  } catch (error) {
    console.error('Error generating static content:', error);
  }
};

// Run the function
generateStaticContent();
