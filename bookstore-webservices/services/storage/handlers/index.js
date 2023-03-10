const PDFDocument = require("pdfkit");
const fs = require("fs");

const PDF_DOCUMENTS_DIR = `${__dirname}../../../../pdf-documents`
const uploadFile = (req, res) => {
	// check if the directory we want to save in, exists
	if(!fs.existsSync(PDF_DOCUMENTS_DIR)) {
		fs.mkdir(PDF_DOCUMENTS_DIR);
	}

	const fileName = req.files.document.name;
	const fileDirPath = `${PDF_DOCUMENTS_DIR}/${fileName}`;

	// get the file from the request and copy it in our system
	req.files.document.mv(fileDirPath, (err) => {
		if(err) {
			return res.status(500).send('File not saved.');
		}
		return res.status(201).send('File saved 👼');
	})
};
const getFileList = (req, res) => {
	try {
		let fileDirectory = fs.readdirSync((PDF_DOCUMENTS_DIR));
		return res.status(200).send(fileDirectory)

	} catch (err) {
		console.error(err)
		return res.status(404).send('List list not found.')
	}
};
const downloadFile = (req, res) => {
	let filename = req.params.filename;
	let filePath = `${PDF_DOCUMENTS_DIR}/${filename}`;
	const doesFileExist = fs.existsSync(filePath); 
	if(!doesFileExist) {
		return res.status(404).send('File not found.');
	}
	return res.download(filePath);
	// return res.status(200).send(filePath)
	
};
const removeFile = () => {};
const createPDFFileHandler = async (req, res) => {
    try{
        const { filename } = req.params
        const fileCreated = await generatePDF(filename, "Invoice", "Payment is made");
        if(fileCreated) {
            return res.status(201).send('File created.');
        }
    } catch(err) {
        return res.status(406).send('File not created.')
    }
};

const generatePDF = (fileName, title = "Generic pdf Title", text = "generic pdf text", fontSize = 18) => {
	return new Promise((resolve, reject) => {
		// Create a document
		const doc = new PDFDocument();

        const fileDirectory = `${__dirname}/../../../documents`;

		// Pipe its output somewhere, like to a file or HTTP response
		// See below for browser usage
		const stream = doc.pipe(fs.createWriteStream(`${fileDirectory}/${fileName}.pdf`), { autoDestroy: false});

		// draw some text
		doc.fontSize(fontSize).text("Here is some vector graphics...", 100, 80);

		// some vector graphics
		doc.save()
			.moveTo(100, 150)
			.lineTo(100, 250)
			.lineTo(200, 250)
			.fill("#FF3300");

		doc.circle(280, 200, 50).fill("#6600FF");

		// an SVG path
		doc.scale(0.6)
			.translate(470, 130)
			.path("M 250,75 L 323,301 131,161 369,161 177,301 z")
			.fill("red", "even-odd")
			.restore();

		// and some justified text wrapped into columns
		doc.text(title, 100, 300)
			.font("Times-Roman", fontSize)
			.moveDown()
			.text(text, {
				width: 412,
				align: "justify",
				indent: 30,
				columns: 2,
				height: 300,
				ellipsis: true,
			});

		// end and display the document in the iframe to the right
		doc.end();

        stream.on('finish', (err) => {
            
            resolve(true);
            stream.close();
        })
        stream.on('error', (err) => {
            reject(false);
            console.error(err);
            stream.close();
        });

	});
};

module.exports = {
	uploadFile,
	getFileList,
	downloadFile,
	removeFile,
	createPDFFile: createPDFFileHandler,
};
