# mskdbv2
this is a nosql database for nodejs projects

# mskDb
to create a database use thus comment
# db.mskDb.createDb('test');

to insert data into the database use this command
# mydb.mskDb.insert(name, type, content)

to read single row
# var data = mydb.mskDb.findOne();
# console.log(data.rows[0].id)

to read all rows
# var data = mydb.mskDb.all();
# console.log(data.rows)

to delete database
# mydb.mskDb.drop('mskDb')
# mydb.mskDb.pop('mskDb')

// controls.insert({a: 1, b: 2, c: 3});


// controls.unsetDir("./controls");
// const direc = controls.dir("peter")
// console.log(direc);
// console.log(controls.info().dir);
console.log(controls.dropDb());
// console.log(controls.clone("./bin/backup.js"));
// console.log(controls.amend(id=5, {name: "peter", job: "web designer", age: 27}));
