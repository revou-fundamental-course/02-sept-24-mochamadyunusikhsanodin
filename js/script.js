function showSection(sectionId) {
    document.getElementById('segitiga').style.display = 'none';
    document.getElementById('jajargenjang').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

function hitungSegitiga() {
    const alas = parseFloat(document.getElementById('alas').value);
    const tinggi = parseFloat(document.getElementById('tinggi').value);
    const sisiA = parseFloat(document.getElementById('sisiA').value);
    const sisiB = parseFloat(document.getElementById('sisiB').value);
    const sisiC = parseFloat(document.getElementById('sisiC').value);

    // Buat objek data untuk dikirim ke server
    const data = { alas, tinggi, sisiA, sisiB, sisiC };

    fetch('http://localhost:3000/segitiga', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.error) {
            document.getElementById('hasilSegitiga').innerText = result.error;
        } else {
            document.getElementById('hasilSegitiga').innerHTML = `
                Luas Segitiga: ${result.luas} <br>
                Keliling Segitiga: ${result.keliling}
            `;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function hitungJajarGenjang() {
    const alas = document.getElementById('alasJG').value;
    const tinggi = document.getElementById('tinggiJG').value;
    const sisi = document.getElementById('sisiJG').value;

    if (alas && tinggi && sisi) {
        fetch('http://localhost:3000/jajargenjang', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ alas: alas, tinggi: tinggi, sisi: sisi })
        })
        .then(response => response.json())
        .then(data => {
            if (data.luas) {
                document.getElementById('jajargenjangHasil').innerText = `Luas: ${data.luas}, Keliling: ${data.keliling}`;
            } else {
                alert(data.error);
            }
        });
    } else {
        alert("Masukkan semua nilai!");
    }
}

