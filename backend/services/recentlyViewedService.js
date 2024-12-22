// import  { db}  from "../config/firebase.js";
import { db_client } from "../config/firebase_client.js";
import { redisClient, connectRedis } from "../config/redis.js";
import { collection, where, getDocs, doc, query, orderBy, limit, getDoc } from "firebase/firestore";
const MAX_PRODUCTS = 20;

// Fetch recently viewed products
export const getRecentlyViewed = async (userId) => {
  try {
    const cacheKey = `recentlyViewed:${userId}`;
    await connectRedis();
    //  Check Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData);
    
    console.log(`Record Fetch from Firestore`);
    // Query Firestore for recently viewed products
    const q = query(collection(db_client, "product_view"), where("user_id", "==", String(userId)), orderBy("timestamp", "desc"), limit(MAX_PRODUCTS));
    const querySnapshot = await getDocs(q);
    const productIds = new Set();
    querySnapshot.forEach((doc) => {
      productIds.add(doc.data().product_id);
    });

    const productDetails = [];
    for (const productId of productIds) {
      console.log(`productId: ${productId}`);
      const productRef = doc(db_client, "products", productId.toString());
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        let productData = productSnap.data();
        productData["id"] = productId;
        productDetails.push(productData);
      } else {
        console.log(`Product with id ${productId} not found.`);
      }
    }
    // Cache in Redis

    productDetails && redisClient.set(cacheKey, JSON.stringify(productDetails), "EX", 3600);
    return productDetails;
  } catch (error) {
    console.log(`Error fetching recently viewed products: ${error.message}`);
    throw new Error(error.message);
  }
}
  ;
