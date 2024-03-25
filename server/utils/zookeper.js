import zookeeper from "node-zookeeper-client";
import { ApiError } from "./ApiError.js";
import { asyncHandler } from "./asyncHandler.js";

// connect to zookeeper
const client = zookeeper.createClient("localhost:2181");

let range = {
  start: 0,
  end: 0,
  curr: 0,
};

const hashGenerator = (n) => {
  const hash = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let hash_str = "";

  while (n > 0) {
    hash_str += hash[n % 62];
    n = Math.floor(n / 62);
  }
  return hash_str;
};

const setTokenRange = asyncHandler(async (token) => {
  let dataToSet = Buffer.from(String(token), "utf-8");

  client.setData("/token", dataToSet, (error, stat) => {
    if (error) {
      throw new ApiError(400, "Unable to set data");
    }
    console.log("Data is set.");
  });
});

const getTokenRange = asyncHandler(async () => {
  client.getData("/token", (error, data, stat) => {
    if (error) {
      throw new ApiError(400, "Unable to get data");
    }
    console.log(data.toString());
    range.start = parseInt(data.toString()) + 1000000;
    range.end = parseInt(data.toString()) + 2000000;
    range.curr = parseInt(data.toString()) + 1000000;
  });

  setTokenRange(range.start);
});

const createToken = asyncHandler(async () => {
  let buffer = Buffer.from("0", "utf-8");

  client.create(
    "/token",
    buffer,
    zookeeper.CreateMode.PERSISTENT,
    (error, path) => {
      if (error) {
        throw new ApiError(400, "Unable to create token");
      }
      console.log("Node: %s is created", path);
    }
  );
});

const checkIfTokenExists = asyncHandler(async () => {
  client.exists("/token", (error, data) => {
    if (error) {
      throw new ApiError(400, "Failed token check");
    }
    if (data) {
      console.log("Node exists: %s", data);
    } else createToken();
  });
});

const removeToken = asyncHandler(async () => {
  client.remove("/token", (error, stat) => {
    if (error) {
      throw new ApiError(400, "Unable to remove token");
    }
    console.log("Node is deleted");
  });
});

const connectZK = asyncHandler(async () => {
  client.once("connected", async () => {
    console.log("Connected to ZK server");
    checkIfTokenExists();
    getTokenRange();
    console.log("Hello", range.start);
  });
  client.connect();
});

export {
  range,
  hashGenerator,
  setTokenRange,
  getTokenRange,
  createToken,
  checkIfTokenExists,
  removeToken,
  connectZK,
};
