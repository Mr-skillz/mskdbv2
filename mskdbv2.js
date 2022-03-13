function msc(c) {console.log(c)}
const { data } = require('autoprefixer');
const fs = require('fs-extra')
var unirest = require('unirest');

const today = new Date().toLocaleDateString()
const now = new Date().toLocaleTimeString()

class MskDb {
    constructor ( db, direct, extension) {
        this.directory = direct || 'model'
        this.ext = extension || 'msk';
        this.database = `${this.directory}/${db}.${this.ext}` || 'mskdbv2';
    }

    createDb(db){
        let patt = `${db}.${this.ext}`;
        if (!fs.existsSync(patt)) {
            fs.writeFile(`${db}.${this.ext}`, '[\n\t\n]', (err)=>{
                if (err) throw err;
                console.log('database has been created!');
              });
            this.database = db
        }
        return this
    }

    dir(dir){
       this.directory = dir;
       if (!fs.existsSync(this.directory)){
            fs.mkdirSync(this.directory);
        }
        this.directory = dir
        return this
    }

    unsetDir(dir){
        fs.rmdir(dir, { recursive: true }, (err) => {
            if (err) {
              console.error(err);
            }
        });
          
        return this
     }

    //  helpers
    #writer(payload){
        return fs.writeFileSync(`${this.database}`, JSON.stringify(payload, null, 2), 'utf-8');
    }

    #order(){
        let rows = []
        this.all().forEach((row)=>{
            rows.push(row.id)
        })
        let ordered = rows.sort();
        let sorted = []
        ordered.forEach((id)=>{
            sorted.push(this.findOne(id)[0]);
        })
        this.#writer(sorted);
    }
    // insert
    insert(data){
        let id = 0;
        fs.readFile(`${this.database}`, 'utf-8', (err, content)=>{
            let oldData = JSON.parse(content);
            oldData.forEach((row)=>{if(row.id > id) id = row.id})
            let templateData = {id: id+=1, data, date: today, time: now};
            oldData.push(templateData)
            this.#writer(oldData);
            console.log("1 row added");
        })
        return this
    }

    add(data){
        let id = 0;
        fs.readFile(`${this.database}`, 'utf-8', (err, content)=>{
            let oldData = JSON.parse(content);
            oldData.forEach((row)=>{if(row.id > id) id = row.id})
            let templateData = {id: id+=1, data, date: today, time: now};
            oldData.push(templateData)
            this.#writer(oldData);
            console.log("1 row added");
        })
        return this
    }

    // read
    find(data){
        return this.all().filter((row)=>{return row.data.name == data.name && row.data.room == data.room})
        
    }

    findOne(id){
        return JSON.parse(fs.readFileSync(`${this.database}`, 'utf-8')).filter((row)=>{return row.id === parseInt(id)})
    }

    all(){
        return JSON.parse(fs.readFileSync(`${this.database}`, 'utf-8'))
    }

    // update
    amend(id, data){
        let row = this.findOne(id);
        let update = row[0].data = data
        let getAll = this.all().filter((row)=>{return row.id !== id})
        getAll.push(row[0])
        this.#writer(getAll);
        this.#order()
    }

    upgrade(id, data){
        let row = this.findOne(id);
        let update = row[0].data = data
        let getAll = this.all().filter((row)=>{return row.id !== id})
        getAll.push(row[0])
        this.#writer(getAll);
        this.#order()
    }

    update(id, data){
        let row = this.findOne(id);
        let update = row[0].data = data
        let getAll = this.all().filter((row)=>{return row.id !== id})
        getAll.push(row[0])
        this.#writer(getAll);
        this.#order()
    }
    
    // delete
    
    // delete database
    dropDb(){
        let patt = this.database;
        if (fs.existsSync(patt)) {
            fs.unlinkSync(`${this.database}`)
            return "Database has been deleted";
        }else{
            return "Sorry Database those not exist";
        }
    }

    // delete one
    drop(id){
        let rows = this.all().filter((row)=>{return row.id !== parseInt(id)})
        this.#writer(rows)
        this.#order()
        return "1 row droped";
    }

    pop(id){
        let rows = this.all().filter((row)=>{return row.id !== parseInt(id)})
        this.#writer(rows)
        this.#order()
        return "1 row droped";
    }

    delete(id){
        let rows = this.all().filter((row)=>{return row.id !== parseInt(id)})
        this.#writer(rows)
        this.#order()
        return "1 row droped";
    }

    // special
    clone(file){
        let data = this.all()
        fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8")
        console.log("database has been cloned");
    }

    backup(file){
        let data = this.all()
        fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8")
        console.log("database has been cloned");
    }
    info(){
        return{
            dir: this.directory,
            db: this.database,
            version: "1.0.0",
            author: "Promise Peter Akpan (A.K.A Mr Skillz)",
            methods:{
                create: "insert, add",
                read: "find, findOne, all",
                update: "amend, upgrade, update",
                delete: {
                    single:"pop, delete",
                    all: "dropDb",
                    directory: "unsetDir"
                }
            }
        }
    }
}

 module.exports = { MskDb, msc};