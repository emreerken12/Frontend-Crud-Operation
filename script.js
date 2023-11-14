

const database = [

    {
        id: Date.now() +1,
        name: "emre",
        last: "erken",
        email: "erkenemre12@gmail.com"
    },

    {
        id: Date.now() +2,
        name: "mehmet",
        last: "simsek",
        email: "mehmetsimsek@gmail.com"
    },

    {
        id: Date.now(),
        name: "ahmet",
        last: "tofaş",
        email: "ahmet@gmail.com"
    }
]



const tbody = document.getElementById('table-body')


// tbody'nin içine <tr </tr> olarak veritabanındaki tüm userleri yazdir
function verileriYaz() {
  // tbody'nin içini boşalt
tbody.innerHTML = "";

database.forEach(function(user) {
  
    const id = `<th scope='row'>${user.id}</th>`

    const isim = `<td id='name'>
    <input id='nameInput-${user.id}' type='text' onchange='changeInput(this, "${user.id}")' value=${user.name}>
    </td>`

    const soyisim = `<td id='lastname'>
    
        <input id='soyisimInput-${user.id}' type='text' onchange='changeInput(this, "${user.id}")' value=${user.last}>
    </td>`

    const email = `<td id='email'>
    <input id='emailInput-${user.id}' type='email' onchange='changeInput(this, "${user.id}")' value=${user.email}>
    </td>`

    const silmeButonu = `<button onclick='userSil(${user.id})' class='btn btn-danger'>Sil</button>`
    const düzenleButonu = `<button id='editBtn-${user.id}' onclick='duzenle(this, "${user.id}")' disabled class='btn btn-warning'>Düzenle</button>`
    const modAraclari = `<td> ${düzenleButonu}  ${silmeButonu} </td>`

    tbody.innerHTML += `<tr> ${id} ${isim} ${soyisim} ${email} ${modAraclari} </tr>`

})

}

// inputların değişmesini sağlayan fonksiyon
function changeInput(input, userId) {
    console.log("td den gelen veri ", input.value, "gelen user id:", userId)

    const editBtn = document.getElementById(`editBtn-${userId}`)

    // value boş ise çalışma
    if (input.value == "") {

        editBtn.disabled = true
        input.placeholder = "Lütfen bu alanı boş bırakmayınız"
        return;

    } else {
        // editbtn'nin disabled halini kaldır
        editBtn.disabled = false
    }

  

}

// düzenle butonu işlevi
function duzenle(button, userId) {

    const name = document.getElementById(`nameInput-${userId}`)
    const lastName = document.getElementById(`soyisimInput-${userId}`)
    const emailInput = document.getElementById(`emailInput-${userId}`)

    if (name.value && lastName.value && emailInput.value) {
        // ilgili kullanıcıyı veritabanında idsine göre bul
        const users = database.find(function(user) {

            // eğer user'idsi parametredeki userId'e eşitse bunu bana döndür
            if (user.id == userId) {
                // bu useri bu fonksiyondan dışarı çıkart
                return user
            }
        })


     
        if (users) {

            // kullanıcı bulunursa bunun verilerini değiştir
            console.log("Kullanıcı güncellenmeden önce:", users)
            users.name = name.value
            users.last = lastName.value
            users.email = emailInput.value

            alert("Kullanıcı güncellendi.")
            console.log("Kullanıcı güncellendikten sonra:", users)
            // butonu tekrar devre dışı bırak
            button.disabled = true

        } else {

            alert("Birşeyler ters gitti daha sonra tekrar deneyin.")
        }

    }

}




function test(td) {

    td.contentEditable = true


}

// veri sil
function userSil(id) {

    const onayla = window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")

    if (onayla) {
    // userleri filtrele
    database.find(function(user, index, array) {

        console.log("veriler:",user, "parametreden gelen id:", id)
        if (user.id === id) {

        array.splice(index, 1)
        // html'i güncelle
        return verileriYaz()

        } 
    })


    console.log(database)
}

}



// tüm verileri silen fonksiyon
function tumVerileriSil() {

    const onayla = window.confirm("Tüm kullanıcıları silmek istediğinize emin misiniz? Bu işlem bir daha geri alınamaz")

    if (onayla) {

        database.length = 0;
        verileriYaz();

    }
}



// veri ekle
function yeniVeriEkle() {

    const isim = prompt("Lütfen bir isim giriniz: ")

    if (isim == null) return;

    const soyisim = prompt("Lütfen bir soyisim giriniz: ")

    if (soyisim == null) return;

    const email = prompt("lütfen bir email giriniz: ")

    if (email == null) return;

    // 3 veride sunulmuşsa
    const model = {

        id: Date.now(),
        name: isim,
        last: soyisim,
        email: email
    }

    // modeli veritabanına gönder
    database.push(model)
    // verileri yazdır
    verileriYaz()

}