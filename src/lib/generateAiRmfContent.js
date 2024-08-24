import fs from 'fs/promises'; // Use promises API for async file operations
import path from 'path';
import * as XLSX from 'xlsx';

// Resolve the directory of the current module
const __dirname = new URL('.', import.meta.url).pathname;

// Path to your Excel file in the /assets directory
const excelFilePath = path.join(__dirname, '../assets', 'muad-dib-ai.xlsx');

// Path to the output JavaScript file
const outputFilePath = path.join(__dirname, '/', 'ai-rmf-content.ts');


// TODO: Figure out why I can't import this function
export const replaceSpacesWithUnderscores = (input) => {
  return input.replace(/ /g, '_');
}

// Function to generate static content
const generateStaticContent = async () => {
  try {

    const fileBuffer = await fs.readFile(excelFilePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const worksheets = {};

    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

      const structuredData = {};
      let currentSection = null;

      rows.forEach(row => {

        if (row.every(cell => !cell)) {
          return;
        }

        const [firstCell, ...restCells] = row;

        if (firstCell) {
          // New section starts
          if (currentSection) {
            if (!structuredData[sheetName]) {
              structuredData[sheetName] = [];
            }
            structuredData[sheetName].push(currentSection);
          }
          currentSection = {
            title: firstCell.toString(),
            steps: [restCells.map(cell => cell?.toString() || '')],
          };
        } else if (currentSection) {
          // Append to the current section
          currentSection.steps.push(restCells.map(cell => cell?.toString() || ''));
        }
      });

      // Push the last section if it exists
      if (currentSection) {
        if (!structuredData[sheetName]) {
          structuredData[sheetName] = [];
        }
        structuredData[sheetName].push(currentSection);
      }

      worksheets[sheetName] = structuredData[sheetName] || [];

      // const filteredRows = rows.filter(row => !isEmptyRow(row));

      // worksheets[sheetName] = filteredRows;
    });

    const worksheetsString = Object.entries(worksheets).map(([sheetName, sections]) => {
      const sectionsString = sections.map(section => {
        const stepsString = section.steps.map(step =>
          `[${step.map(value => JSON.stringify(value)).join(', ')}]`
        ).join(',\n');

        return `{\n  title: "${section.title}",\n  steps: [\n${stepsString}\n  ]\n}`;
      }).join(',\n');

      return `${replaceSpacesWithUnderscores(sheetName)}: [\n${sectionsString}\n]`;
    }).join(',\n');

    const jsContent = `
interface AiRmfProps {
  [key: string]: {
    title: string;
    steps: string[][];
  }[];
}
export const data:AiRmfProps = {
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
