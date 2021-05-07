const firebaseConfig = {
  apiKey: "AIzaSyA5BeIL2lDsWMGxJjToxjyYQG6ke_NLpkU",
  authDomain: "hola-48557.firebaseapp.com",
  projectId: "hola-48557",
  storageBucket: "hola-48557.appspot.com",
  messagingSenderId: "1008575883429",
  appId: "1:1008575883429:web:fe10f91c54e285d73ec54c",
  measurementId: "G-ESWBLKHCGD"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // firebase.analytics();


const db = firebase.firestore();
db.collection('recipes');

const list = document.querySelector('ul');
const addRecipe = recipe => {
    let formattedTime = recipe.created_at.toDate();
    let html = 
        <li>
            <div>${recipe.title}</div>
            <div>${formattedTime}</div>
        </li>
    ;
    list.innerHTML += html;
};
db.collection('recipes').get()
    .then(snapshot => {
        // console.log(snapshot.docs[0].data());
        snapshot.forEach(doc => {
            // console.log(doc.data());
            addRecipe(doc.data());
        });
    })
    .catch(err => console.log(err));
    const form = document.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        let now = new Date();
        const recipe = {
            title: form.recipe.value,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        db.collection('recipes').add(recipe)
    .then(() => alert('recipe added!'))
    .catch(err => console.log(err))
    });