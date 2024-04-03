import React, { useState } from "react";
import { postLongUrl } from "../../utils/postLongUrl";
import { SERVER_URL } from "../../utils/constants";
import { redirectURL } from "../../utils/redirectURL";

const Body = () => {
  const [response, setResponse] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const handleSubmit = async () => {
    const response = await postLongUrl(longUrl);
    setResponse(response);
  };

  // const handleRedirect = async (shortURL) => {
  //   await redirectURL(shortURL);
  // };
  return (
    <div className="container mx-auto mt-8">
      <div className="bg-gray-200 p-4">
        <input
          type="text"
          className="w-full py-2 px-4 rounded border border-gray-300"
          placeholder="Paste your URL here"
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
      {response && (
        <div className="mt-4">
          <p className="text-gray-800">
            Your short URL is: {`${SERVER_URL}${response}`}
          </p>
          <a
            onClick={() => (window.location.href = SERVER_URL + response)}
            className="text-blue-500 hover:underline"
          >
            Click here
          </a>
        </div>
      )}
    </div>
  );
};

export default Body;
