import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZwFyvnV5MTOo45tEXxcEo85MLH97_mHg",
  authDomain: "skyfitnesspro-84c01.firebaseapp.com",
  databaseURL:
    "https://skyfitnesspro-84c01-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "skyfitnesspro-84c01",
  storageBucket: "skyfitnesspro-84c01.appspot.com",
  messagingSenderId: "144423868403",
  appId: "1:144423868403:web:5389ca8b9e582e81572486",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

// Инструкция по использованию 
// 1. npm install

// 2. Импортируйте и вызовите signInWithEmailAndPassword(auth, email, pass) - Авторизация

// 3. Импортируйте и вызовите createUserWithEmailAndPassword(auth, email, pass) - Регистрация

// 4. Импортируйте и вызовите signOut(auth) - Выход из учетной записи

// 5. Импортируйте и вызовите sendPasswordResetEmail(auth, email) - восстановление пароля

// 6. Импортируйте и вызовите onAuthStateChanged(auth, (user) =>{}) - следить за состоянием пользователя, при наличии user запишите в состояние его данные"

// 7. Импортируйте и вызовите updateProfile(currentUser, { displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg", }) - для изменения данных пользователя Имя и Фото

// 8. Обновление пароля 
// const user = auth.currentUser;
// const newPassword = "данные из импута";
// Импортируйте и вызовите updatePassword(user, newPassword)

// auth - импортируется отдельно из firebase.ts

// все функции возвращают ответ можно обрабатывать через then и catch  