function showSection(sectionId) {
    document.getElementById('segitiga').style.display = 'none';
    document.getElementById('jajargenjang').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

function hitungSegitiga() {
    const alas = document.getElementById('alas').value;
    const tinggi = document.getElementById('tinggi').value;

    if (alas && tinggi) {
        fetch('http://localhost:3000/segitiga', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ alas: alas, tinggi: tinggi })
        })
        .then(response => response.json())
        .then(data => {
            if (data.luas) {
                document.getElementById('segitigaHasil').innerText = `Luas Segitiga: ${data.luas}`;
            } else {
                alert(data.error);
            }
        });
    } else {
        alert("Masukkan nilai alas dan tinggi!");
    }
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

