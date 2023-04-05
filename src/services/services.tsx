/* Upload file to API */
const uploadFile = async (file: FileList, user: any) => {
  const data = new FormData();
  data.append("file", file[0]);
  data.append("userdata", user);

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

const scrapperWeb = async (url: String, user: any) => {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: url,
      user: user,
    }),
  };

  let response = await fetch(
    import.meta.env.VITE_API_URL + "/scrapperweb",
    requestOptions
  );

  return await response.json();
};

/* Upload  */

const sendQuestionShared = async (prompt: String, urlID: Number) => {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      promptQuery: prompt,
      uid: urlID,
    }),
  };
  1;
  let response = await fetch(
    import.meta.env.VITE_API_URL + "/sendquestion-shared",
    requestOptions
  );

  return await response.json();
};

const sendQuestion = async (prompt: String, urlID: Number, user: any) => {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      promptQuery: prompt,
      uid: urlID,
      user: user,
    }),
  };

  let response = await fetch(
    import.meta.env.VITE_API_URL + "/sendquestion",
    requestOptions
  );

  return await response.json();
};

/* Get information from the file */

const getInfo = async (urlID: Number, user: any) => {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid: urlID, user: user }),
  };

  let response = await fetch(
    import.meta.env.VITE_API_URL + "/getinfo",
    requestOptions
  );

  return await response.json();
};

const loginUser = async (user: any) => {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: user }),
  };

  let response = await fetch(
    import.meta.env.VITE_API_URL + "/login",
    requestOptions
  );

  return await response.json();
};

const getInfoShared = async (urlID: Number) => {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid: urlID }),
  };

  let response = await fetch(
    import.meta.env.VITE_API_URL + "/getinfoshared",
    requestOptions
  );

  return await response.json();
};

const getListChat = async (user: any) => {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: user }),
  };

  let response = await fetch(
    import.meta.env.VITE_API_URL + "/getlistchat",
    requestOptions
  );

  return await response.json();
};

/* Update data */

const sendData = async (data: any, user: any) => {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: data, user: user }),
  };

  let response = await fetch(
    import.meta.env.VITE_API_URL + "/senddata",
    requestOptions
  );

  return await response.json();
};

/* Create a session stripe */

const createSessionStripe = async (priceID: any, user: any) => {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ price_id: priceID, user: user }),
  };

  let response = await fetch(
    import.meta.env.VITE_API_URL + "/create-checkout-session",
    requestOptions
  );

  return await response.json();
};

export {
  uploadFile,
  sendQuestion,
  getInfo,
  sendData,
  sendQuestionShared,
  getInfoShared,
  getListChat,
  scrapperWeb,
  createSessionStripe,
  loginUser,
};
