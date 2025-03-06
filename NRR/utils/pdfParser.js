const pdf = require("pdf-parse");
const fs = require("fs");

const parsePDF = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        return data.text;  // Extracted text from PDF
    } catch (error) {
        throw new Error("Error parsing PDF: " + error.message);
    }
};

module.exports = { parsePDF };
