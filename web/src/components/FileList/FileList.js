import { useState } from "react";
const getRequestOptions = (token) => ({
	method: "GET",
	headers: {
		"content-type": "application/json",
        "Authorization": `bearer ${token}`
	},
});

const FileList = () => {
	const [fileList, setFileList] = useState([]);

	const getFileListData = async () => {
		try {
            const token = localStorage.getItem('jsonwebtoken');
            let response = await fetch('/api/v1/storage/files/', getRequestOptions(token));
            if(!response.ok) {
                throw new Error('cannot obtain data');
            }
            let data = await response.json();
            setFileList(data);

		} catch (err) {
            console.error(err);
        }
	};

	return (
		<div>
			<button onClick={getFileListData}>Get file list</button>
			<ul>
				{fileList.map((file, indx) => {
					return <li key={indx}>{file}</li>;
				})}
			</ul>
			{fileList.length === 0 && <span>No file list present</span>}
		</div>
	);
};

export default FileList;
