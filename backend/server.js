const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware untuk parsing body dari request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Menyajikan file statis (HTML, CSS, JS) dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk halaman utama (root)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Mengarahkan ke file HTML
});

// Endpoint untuk menghitung luas segitiga
app.post('/segitiga', (req, res) => {
    const { alas, tinggi } = req.body;
    if (isNaN(alas) || isNaN(tinggi)) {
        return res.status(400).json({ error: 'Input harus berupa angka' });
    }

    const luas = 0.5 * alas * tinggi;
    res.json({ luas });
});

// Endpoint untuk menghitung luas dan keliling jajar genjang
app.post('/jajargenjang', (req, res) => {
    const { alas, tinggi, sisi } = req.body;
    if (isNaN(alas) || isNaN(tinggi) || isNaN(sisi)) {
        return res.status(400).json({ error: 'Input harus berupa angka' });
    }

    const luas = alas * tinggi;
    const keliling = 2 * (parseFloat(alas) + parseFloat(sisi));
    res.json({ luas, keliling });
});

// Jalankan server pada port 3000
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
