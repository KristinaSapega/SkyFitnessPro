Краткий Гайд как пользоваться:
firebase.ts это файл реализующий возможность подключения к регистрации и авторизации пользователей и базе данных на серваке гугла. Его редактировать не нужно

/////// 1. npm install
Все что вы берете из файла это это импортируете в нужную часть проекта одну из констан "auth" и "database", она содержит в себе данные полученные с сервера исходя из конфигурации firebaseConfig.

import { auth } from "./firebase";
import { database } from "./firebase";

Ниже представлены методы
Авторизация
/////// 2. Импортируйте и вызовите signInWithEmailAndPassword(auth, email, pass)

Регистрация
/////// 3. Импортируйте и вызовите createUserWithEmailAndPassword(auth, email, pass)

Выход из учетной записи
/////// 4. Импортируйте и вызовите signOut(auth)

Восстановление пароля
/////// 5. Импортируйте и вызовите sendPasswordResetEmail(auth, email)

Получить текущего вошедшего в систему пользователя запускать через usEffect,
/////// 6. Импортируйте и вызовите onAuthStateChanged(auth, (user) =>{
if (user) {
В этом месте нужно записать данные пользователя в стейт
}})

Изменить данные пользователя Имя и Фото
/////// 7. Импортируйте и вызовите updateProfile(currentUser, { displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg", })

Обновление пароля
/////// 8. Импортируйте и вызовите updatePassword(user, newPassword)
const user = auth.currentUser;
const newPassword = "данные из импута";

все функции возвращают ответ можно обрабатывать через then и catch

https://firebase.google.com/docs/auth/web/manage-users - полная документация на английском

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Доступ к данным на сервере!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

В нужном компоненте импортируйте
import { onValue, ref } from "firebase/database";
import { database } from "../firebase";

///// Метод просмотра всех данных сервере
const dataRef = ref(database);
onValue(dataRef, (snapshot) => {
const data = snapshot.val();
console.log(data) // Покажет все информацию на сервере
});

///// Метод просмотра данных о всех курсах
const dataRef = ref(database, '/courses');
onValue(dataRef, (snapshot) => {
const data = snapshot.val();
console.log(data) // Покажет все курсы
});

///// Метод просмотра данных о всех тренировках
const id = // необходимо достать после map-инга
const dataRef = ref(database, '/workouts');
onValue(dataRef, (snapshot) => {
const data = snapshot.val();
console.log(data); // Покажет все тренировки
});

///// Метод просмотра данных о тренировках конкретного курса
const id = // необходимо достать после map-инга
const dataRef = ref(database, 'courses/' + id + '/workouts');
onValue(dataRef, (snapshot) => {
const data = snapshot.val();
console.log(data); // Покажет массив ID тренировок относящихся к данному курсу
});

///// Метод просмотра данных о упражнениях конкретной тренировки
const id = // необходимо достать после map-инга
const dataRef = ref(database, 'workouts/' + id + '/exercises');
onValue(dataRef, (snapshot) => {
const data = snapshot.val();
console.log(data);
});

///// Метод создания и обновления пользовательского прогресса в базе данных FB.
Если FB в папке "user" найдет объект с "именем" === "UID" пользователя он перезапишет данные которые будут помещены в шаблон.
Важно заполнить шаблон полностью, возможно сработает спред.

Если в папке "user" нет подходящего объекта FB создаст новый объект с шаблонным содержимым.

const writeUserDataInBase = (uid: string) => {
set(ref(database, "users/" + auth.currentUser?.uid),
{
_id: auth.currentUser?.uid,
courses: [0],
workouts: {
0: 0,
},
});
};

///// Метод удаления объектов из базы
remove(ref(database, "users/" + auth.currentUser?.uid));
