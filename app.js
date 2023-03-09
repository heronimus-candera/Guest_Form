const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const app = express();

const conn = mysql.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


function input(tamu) {
    conn.query(
        'INSERT INTO tbltamu (nama, instansi, keperluan, kontak) VALUES(?,?,?,?) ', [tamu.nama, tamu.instansi, tamu.keperluan, tamu.kontak]
    );
}


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.render('user/user.ejs');
});

app.post('/', (req, res) => {
    const nama = req.body.Nama;
    const instansi = req.body.instansi;
    const keperluan = req.body.keperluan;
    const kontak = req.body.kontak;
    const tamu = {
        nama: nama,
        instansi: instansi,
        keperluan: keperluan,
        kontak: kontak
    };
    input(tamu);
    res.render('user/selamat-datang.ejs', {
        name: nama
    });
})

app.listen(3000, function () {
    console.log('jalan');
})