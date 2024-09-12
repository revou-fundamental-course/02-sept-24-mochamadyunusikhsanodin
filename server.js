const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// Gunakan cors untuk mengizinkan semua origin
app.use(cors());

// Middleware untuk parsing body dari request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sajikan folder CSS dan JS secara statis
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Route untuk halaman utama (root)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint untuk menghitung luas dan keliling segitiga
app.post('/segitiga', (req, res) => {
    const { alas, tinggi, sisiA, sisiB, sisiC } = req.body;

    // Pastikan bahwa semua nilai dikonversi ke angka
    const alasNum = parseFloat(alas);
    const tinggiNum = parseFloat(tinggi);
    const sisiANum = parseFloat(sisiA);
    const sisiBNum = parseFloat(sisiB);
    const sisiCNum = parseFloat(sisiC);

    // Periksa apakah input adalah angka yang valid
    if (isNaN(alasNum) || isNaN(tinggiNum) || isNaN(sisiANum) || isNaN(sisiBNum) || isNaN(sisiCNum)) {
        return res.status(400).json({ error: 'Input harus berupa angka' });
    }

    // Perhitungan luas segitiga
    const luas = 0.5 * alasNum * tinggiNum;

    // Perhitungan keliling segitiga
    const keliling = sisiANum + sisiBNum + sisiCNum;

    res.json({ luas, keliling });
});


// Endpoint untuk menghitung luas dan keliling jajar genjang
app.post('/jajargenjang', (req, res) => {
    const { alas, tinggi, sisi } = req.body;

    // Periksa apakah input adalah angka
    if (isNaN(alas) || isNaN(tinggi) || isNaN(sisi)) {
        return res.status(400).json({ error: 'Input harus berupa angka' });
    }

    // Perhitungan luas jajar genjang
    const luas = alas * tinggi;

    // Perhitungan keliling jajar genjang
    const keliling = 2 * (parseFloat(alas) + parseFloat(sisi));

    res.json({ luas, keliling });
});

// Jalankan server pada port 3000
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
