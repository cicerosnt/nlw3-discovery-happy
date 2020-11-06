function save(db, orphanage) {

    console.log(orphanage);

    return db.run(`
        INSERT INTO orphanages(
            lat,
            lng,
            name,
            about,
            whatsapp,            
            images,
            instructions,
            opening_hours,
            open_on_weekend
        )VALUES(
            "${orphanage.lat}",
            "${orphanage.lng}",
            "${orphanage.name}",
            "${orphanage.about}",
            "${orphanage.whatsapp}",            
            "${orphanage.images}",
            "${orphanage.instructions}",
            "${orphanage.opening_hours}",
            "${orphanage.open_on_weekend}"
        )
    `);
}

module.exports = save;
