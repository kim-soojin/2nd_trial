const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");

const apiUrl = "https://favqs.com/api/qotd";

// MongoDB 연결 정보
const uri = "mongodb://localhost:27017"; // MongoDB URI
const dbName = "myDatabase"; // 데이터베이스 이름
const collectionName = "quotes";

// 데이터 가져오기
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.quote;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// MongoDB에 데이터 삽입
async function insertData(data) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    console.log("Inserted data with id:", result.insertedId);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.close();
  }
}

// 실행
async function main() {
  try {
    const data = await fetchData();
    await insertData(data);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
