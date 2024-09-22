import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../firebaseConfig'; // Подключение к Firestore

// Функция для сохранения поста
export const savePost = async (userId: string, postContent: string) => {
  try {
    const postRef = await addDoc(collection(db, "posts"), {
      userId: userId,
      content: postContent,
      createdAt: new Date(),
    });
    console.log("Post saved with ID: ", postRef.id);
  } catch (error) {
    console.error("Error saving post: ", error);
  }
};

// Функция для сохранения mood board
export const saveMoodBoard = async (userId: string, moodBoardName: string) => {
  try {
    const moodBoardRef = await addDoc(collection(db, "moodBoards"), {
      userId: userId,
      name: moodBoardName,
      createdAt: new Date(),
    });
    console.log("Mood board created with ID: ", moodBoardRef.id);
  } catch (error) {
    console.error("Error creating mood board: ", error);
  }
};

// Получение постов пользователя
export const fetchUserPosts = async (userId: string) => {
  const posts: any[] = [];
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    if (doc.data().userId === userId) {
      posts.push({ ...doc.data(), id: doc.id });
    }
  });
  return posts;
};

// Получение mood boards пользователя
export const fetchUserMoodBoards = async (userId: string) => {
  const moodBoards: any[] = [];
  const querySnapshot = await getDocs(collection(db, "moodBoards"));
  querySnapshot.forEach((doc) => {
    if (doc.data().userId === userId) {
      moodBoards.push({ ...doc.data(), id: doc.id });
    }
  });
  return moodBoards;
};