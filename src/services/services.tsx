/* Upload file to API */
const uploadFile = async (file: FileList) => {
  const data = new FormData();
  data.append("file", file[0]);

  let requestOptions = {
    method: "POST",
    body: data,
  };

  let response = await fetch(
    import.meta.env.VITE_API_URL + "/uploadfile",
    requestOptions
  );

  return await response.json();
};

/* Upload  */

const sendQuestion = async (prompt: String, urlID: Number) => {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ promptQuery: prompt, uid: urlID }),
  };

  let response = await fetch(
    import.meta.env.VITE_API_URL + "/sendquestion",
    requestOptions
  );

  return await response.json();
};

export { uploadFile, sendQuestion };
