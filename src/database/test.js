const Database = require('./db.js');
const save = require('./save.js');

Database.then(async db =>{
    //inserir dados
    await save(db, {
        lat: "-21.142898", 
        lng: "-48.975939",
        name: "Lar dos morceguinhos 🐐",
        about: "A morcegada toda ta aqui!",
        whatsapp: "1799991-8888",
        images:[
            "file:///home/user/Pictures/ingles-revis%C3%A3o/modal-verb-3.png",
            "file:///home/user/Pictures/ingles-revis%C3%A3o/modal-verb-4.png"
        ].toString(),
        instructions: "Leve ração, água e muita disposição para bricadeiras",
        opening_hours: "Visitas somente durante a semana das 14h00 as 18h00",
        open_on_weekend: "0",
    });

    //consulra de dados
    const selectedOrphanage = await db.all("select * from orphanages");
    console.log(selectedOrphanage);


    //consulta somente um orfanato
    //const orphanage = await db.all("select * from orphanages where id = '10'");
     //console.log(orphanage);

     //deletar dados da tabela
     //console.log(await db.run(`delete from orphanages where id = '6'`));

});