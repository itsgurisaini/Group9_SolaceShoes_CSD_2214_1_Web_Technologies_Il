let db = openDatabase('shoesCollection', '1.0', 'Test DB', 2 * 1024 * 1024);

$(function () {

    // add order
    $("#buy-now").click(function (e) {
        db.transaction(function (query) {
            let sql = "CREATE TABLE IF NOT EXISTS orders " +
                "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "username VARCHAR(100) NOT NULL," +
                "email VARCHAR(100) NOT NULL," +
                "phone VARCHAR(100) NOT NULL," +
                "city VARCHAR(100) NOT NULL," +
                "price VARCHAR(100) NOT NULL," +
                "productname VARCHAR(100) NOT NULL," +
                "zipcode  VARCHAR(100) NOT NULL)";
            query.executeSql(sql, undefined, function () {
                // alert("Table is created successfully");

                // insert data
                let productname = document.querySelector('.product-name > h1').innerText;
                let price = (document.querySelector('.product-price').innerText || '').replace('$', '');
                let username = document.querySelector('.contact-details > form > div > [name="name"]').value;
                let email = document.querySelector('.contact-details > form > div > [name="email"]').value;
                let phone = document.querySelector('.contact-details > form > div > [name="phone"]').value;
                let city = document.querySelector('.contact-details > form > div > [name="city"]').value;
                let zipcode = document.querySelector('.contact-details > form > div > [name="zipcode"]').value;
                let date = formatDate(new Date());
                debugger;

                if (username == '' || email == '' || phone == '' || city == '' || zipcode == '') {
                    alert("Please fill all the fields");
                } else {
                    db.transaction(function (transaction) {
                        let sql_insert = "INSERT INTO orders(username, email, phone, city, price, productname, zipcode) VALUES(?,?,?,?,?,?,?)";
                        transaction.executeSql(sql_insert, [username, email, phone, city, price, productname, zipcode], function () {
                            alert("New order is placed successfully");

                            location.replace("profile.html");
                        }, function (transaction, err) {
                            debugger;
                            alert(err.message);
                        });
                    });
                }
            }, function () {
                // alert("Table is already being created");

                // insert data
                let productname = document.querySelector('.product-name > h1').innerText;
                let price = (document.querySelector('.product-price').innerText || '').replace('$', '');
                let username = document.querySelector('.contact-details > form > div > [name="name"]').value;
                let email = document.querySelector('.contact-details > form > div > [name="email"]').value;
                let phone = document.querySelector('.contact-details > form > div > [name="phone"]').value;
                let city = document.querySelector('.contact-details > form > div > [name="city"]').value;
                let zipcode = document.querySelector('.contact-details > form > div > [name="zipcode"]').value;

                if (username == '' || email == '' || phone == '' || city == '' || zipcode == '') {
                    alert("Please fill all the fields");
                } else {
                    db.transaction(function (transaction) {
                        let sql_insert = "INSERT INTO orders(username, email, phone, city, price, productname, zipcode) VALUES(?,?,?,?,?,?,?)";
                        transaction.executeSql(sql_insert, [username, email, phone, city, price, productname, zipcode], function () {
                            alert("New order is placed successfully");

                            location.replace("profile.html");
                        }, function (transaction, err) {
                            alert(err.message);
                        });
                    });
                }
            });
        });
    });

    // view order history
    $("#view-orders").click(function (e) {
        db.transaction(function (query) {
            let loggedInUser = localStorage.getItem("email");
            let sql = `SELECT * FROM orders WHERE email="${loggedInUser}" `;
            query.executeSql(sql, undefined, function (transaction, result) {
                debugger;
                ((document.querySelector('.orders').attributes || {})['style'] || {}).value = "display: inline-block";
                if (result.rows.length) {
                    for (let i = 0; i < result.rows.length; i++) {
                        let row = result.rows.item(i);
                        let date = row.date;
                        let productname = row.productname;
                        let price = ((row.price).match(/(\d+.\d+)|(\d+)|(.\d+)/g) || [])[0];

                        console.log(`${date}, ${productname}, ${price}`);
                        $("table > tbody").append('<tr><td>' + productname + '</td><td>' + '1' + '</td><td>$'+ price +'</td></tr>');
                    }
                } else {
                    alert("Nothing is purchased yet.");
                    // $("orders").append('<p>Nothing is purchased yet.</p>')
                }
            }, function (transaction, err) {
                debugger;
                alert('No table found.');
            });
        });
    });

    // format date
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

});