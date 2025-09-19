import { getFirestore } from 'firebase-admin/firestore';
import { getFirebaseAdmin } from '../../../utils/firebaseAdmin';

getFirebaseAdmin();
const db = getFirestore();

export default async function handler(req, res) {
  const { craftId } = req.query;
  if (!craftId) {
    return res.status(400).json({ message: 'Craft ID is required' });
  }

  const craftRef = db.collection('crafts').doc(craftId);

  switch (req.method) {
    case 'GET': // Get a specific craft by its ID
      try {
        const craftDoc = await craftRef.get();
        if (!craftDoc.exists) {
          return res.status(404).json({ message: 'Craft not found' });
        }
        res.status(200).json({ id: craftDoc.id, ...craftDoc.data() });
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch craft' });
      }
      break;

    case 'PUT': // Update a specific craft
      try {
        const { name, description, price, imageUrl } = req.body;
        await craftRef.update({ name, description, price, imageUrl });
        res.status(200).json({ message: 'Craft updated successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to update craft' });
      }
      break;

    case 'DELETE': // Delete a specific craft
      try {
        await craftRef.delete();
        res.status(200).json({ message: 'Craft deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to delete craft' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}