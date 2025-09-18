import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseAdmin } from '../../../utils/firebaseAdmin';

// Initialize Firebase Admin SDK
getFirebaseAdmin();
const auth = getAuth();
const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: 'ID Token is required' });
  }

  try {
    // 1. Verify the ID Token from the client
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // 2. Fetch the user's role from your Firestore database
    const userDoc = await db.collection('users').doc(uid).get();
    const userRole = userDoc.exists ? userDoc.data().role : 'client'; // Default to 'client'

    // 3. Return the user data and role to the client
    res.status(200).json({ 
      uid: uid, 
      email: email, 
      role: userRole,
      message: 'Authentication successful' 
    });

  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
}