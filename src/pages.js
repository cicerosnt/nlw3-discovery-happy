const Database = require('./database/db');
const save = require('./database/save.js');

module.exports = {

    index(request, response) {
        return response.render('index')
    },


    async orphanage(request, response){  //return one register in orphanages
        
        const id = request.query.id;
        
        try {
            const db = await Database;            

            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`);
            //console.log(orphanage[0]);

            const orphanage = results[0];
            orphanage.images = orphanage.images.split(","); //sepraretes string (url image) for commom
            //orphanage.firstImage = orphanage.images[0];

            //orphanage.openWeek = orphanage.open_on_weekend ? true : false;

            if(orphanage.open_on_weekend == '0' || orphanage.open_on_weekend == 0){
                orphanage.openWeek = false;
            }else{
                orphanage.openWeek = true;
            }


            return response.render("orphanage", {orphanage})

        } catch (error) {
            return response.send('Erro ao reunir dados');
            console.log(error);
        }
    },

    async orphanages(request, response){  //return all register in orphanages
        try {
            const db = await Database;

            const orphanages = await db.all("select * from orphanages");
            return response.render("orphanages", {orphanages})

        } catch (error) {
            return response.send('Erro ao reunir dados');
            console.log(error);
        }
    },

    create(request, response){

        const data = request.query.body;

        return response.render('create-orphanage')
    },

    async saveOphanage(request, response){
        const field = request.body;

        //console.log(Object.values(field));

        if(Object.values(field).includes('')){
            return response.send('Oopa! \n\nAlguns campos foram encontrados sem preenchimento, por favor verifique!');
        }

        try {

            const db = await Database;
             await save(db, {
                lat: field.lat,
                lng: field.lng,
                name: field.name,
                about: field.about,
                whatsapp: field.whatsapp,
                images: field.images.toString(),
                instructions: field.instructions,
                opening_hours: field.opening_hours,
                open_on_weekend: field.open_on_weekend,
            });

            return response.redirect('/orphanages');
            
        } catch (error) {
            console.log(error);
            return response.send('Erro de comunicação com o banco!');
        }

        
    }
    
}