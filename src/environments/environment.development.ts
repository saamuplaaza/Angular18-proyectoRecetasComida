export const environment = {
    production: false,
    firebaseConfig : {
        apiKey: "AIzaSyBYtonlC4hAwQbGpkDKWq1saR269B7Okpk",
        authDomain: "recetario-99e37.firebaseapp.com",
        projectId: "recetario-99e37",
        storageBucket: "recetario-99e37.appspot.com",
        messagingSenderId: "925581215681",
        appId: "1:925581215681:web:a445e56209bf7f756c9140",
        measurementId: "G-XGJNF80Q8C"
    },
    api:{
        categories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
        nationalities: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
        listByCategory: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
        listByNationality: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
        viewRecipe: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
    }
};
