<template>
<div class="help">
    <h1>
        Admin webpage Instructions
    </h1>
    <br>
    <router-link :to="{ name: 'Home'}">
    <h2>
        Home
    </h2>
    </router-link>
    <p>
        En aquesta pantalla es poden consultar les estadísitiques sobre l'aplicació.
    </p>
    <br>
    <router-link :to="{ name: 'Usuaris'}">
    <h2>
        Users
    </h2>
    </router-link>
    <p>
        En aquesta vista es poden consultar i realitzar les accions d'admin cap als usuaris. <br>
        A més, també es pot banejar permanentment usuaris i desbannejar-los.
    </p>
    <div class="block">
        <table>
            <tr><td><v-img :src="require('../assets/edit.png')"   width ="25px" height="25px"/> </td><td>  <p> Icona per editar usuari </p></td></tr>
            <tr><td><v-img :src="require('../assets/block.png')"   width ="25px" height="25px"/> </td><td>  <p> Icona per bannejar usuari</p></td></tr>
            <tr><td><v-img :src="require('../assets/tick-icon.png')"   width ="25px" height="25px"/> </td><td>  <p> Icona per desbannejar usuari </p></td></tr>
            <tr><td><v-img :src="require('../assets/star4.png')"   width ="25px" height="25px"/> </td><td>  <p> Icona per convertir usuari a premium </p></td></tr>
            <tr><td><v-img :src="require('../assets/lock-premium.png')"   width ="25px" height="25px"/> </td><td>  <p> Icona per convertir usuari premium a usuari normal </p></td></tr>
            </table>
    
    </div>
    <br>
    <router-link :to="{ name: 'Museums'}">
    <h2 >
        Museums
    </h2>
    </router-link>
    <p>
        En aquesta vista es pot consultar els museus que hi ha, per cada museu al clickar al seu nom es poden veure les exposicions que conté.    <br>
        També es pot afegir un museu nou o editar-ne i esborrar-ne un d'existent.
    </p>
    <div class="block">
        <table>
            <tr><td><v-img :src="require('../assets/delete-icon.png')"   width ="25px" height="25px"/> </td><td>  <p> Icona per eliminar un museu</p></td></tr>
            <tr><td><v-img :src="require('../assets/edit.png')"   width ="25px" height="25px"/> </td><td>  <p> Icona per editar museu </p></td></tr>
        </table>
    
    </div>
    <br>
    <router-link :to="{ name: 'Quizzes'}">
    <h2>
        Quizzes
    </h2>
    </router-link>
    <p>
        En aquesta vista podem veure tots els quizzes existents, afegir-ne de nous, editar-los. 
    </p>
    <div class="block">
        <table>
            <tr><td><v-img :src="require('../assets/delete-icon.png')"   width ="25px" height="25px"/> </td><td>  <p> Icona per eliminar un quizz</p></td></tr>
            <tr><td><v-img :src="require('../assets/edit.png')"   width ="25px" height="25px"/> </td><td>  <p> Icona per editar un quizz </p></td></tr>      
        </table>
    
    </div>
</div>
</template>

<style scoped>
.help{
    width: 100%;
    text-align: left;
    padding: 25px;
    background-color:rgb(206, 216, 253);
     overflow: scroll;

}
.block{
    padding: 3px;
}
td {
    padding: 1px;
    border-top: none;
    text-align: center;

    
}
table {
    border: 1px solid rgb(10, 10, 10);
    width: 30%;
    padding: 15px;
}

</style>

