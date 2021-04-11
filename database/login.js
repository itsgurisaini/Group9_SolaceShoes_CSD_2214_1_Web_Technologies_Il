let db = openDatabase('shoesCollection', '1.0', 'Test DB', 2 * 1024 * 1024);

$(function () {
    // Sign up 
    $("#signupUser").click(function (e) {
        db.transaction(function (query) {
            let sql = "CREATE TABLE IF NOT EXISTS users " +
                "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "username VARCHAR(100) NOT NULL," +
                "email VARCHAR(100) NOT NULL," +
                "password  VARCHAR(100) NOT NULL)";
            query.executeSql(sql, undefined, function () {
                // alert("Table is created successfully");

                // insert data 
                let username = document.querySelector('.sign-up-container > form > [name="name"]').value;
                let email = document.querySelector('.sign-up-container > form > [name="email"]').value;
                let password = document.querySelector('.sign-up-container > form > [name="password"]').value;
                debugger;

                if (username == '' || email == '' || password == '') {
                    alert("Please fill all the fields");
                } else {
                    db.transaction(function (transaction) {
                        let sql_insert = "INSERT INTO users(username, email, password) VALUES(?,?,?)";
                        transaction.executeSql(sql_insert, [username, email, password], function () {
                            // set session in local storage
                            localStorage.setItem("username", username);
                            localStorage.setItem("email", email);

                            alert("New user is added successfully");
                            location.replace("profile.html");
                        }, function (transaction, err) {
                            alert(err.message);
                        });
                    });
                }
            }, function () {
                // alert("Table is already being created");

                // insert data 
                let username = document.querySelector('.sign-up-container > form > [name="name"]').value;
                let email = document.querySelector('.sign-up-container > form > [name="email"]').value;
                let password = document.querySelector('.sign-up-container > form > [name="password"]').value;

                if (username == '' || email == '' || password == '') {
                    alert("Please fill all the fields");
                } else {
                    db.transaction(function (transaction) {
                        let sql_insert = "INSERT INTO users(username, email, password) VALUES(?,?,?)";
                        transaction.executeSql(sql_insert, [username, email, password], function () {
                            // set session in local storage
                            localStorage.setItem("username", username);
                            localStorage.setItem("email", email);

                            alert("New user is added successfully");
                            location.replace("profile.html");
                        }, function (transaction, err) {
                            alert(err.message);
                        });
                    });
                }
            });
        });
    });

    // Login User
    $("#signInUser").click(function (e) {
        db.transaction(function (query) {
            let enteredEmail = document.querySelector('.sign-in-container > form > [name="email"]').value;
            let enteredPassword = document.querySelector('.sign-in-container > form > [name="password"]').value;
            let sql = `SELECT * FROM users WHERE email="${enteredEmail}" AND password="${enteredPassword}"`;

            if (enteredEmail == '' || enteredPassword == '') {
                alert("Please fill all the fields");
            } else {
                query.executeSql(sql, undefined, function (transaction, result) {
                    // debugger;
                    if (result.rows.length) {
                        for (let i = 0; i < result.rows.length; i++) {
                            let row = result.rows.item(i);
                            let username = row.username;
                            let email = row.email;
                            let password = row.password;

                            if (enteredEmail != email || enteredPassword != password) {
                                alert("Email or password do not match");
                            } else {
                                // set session in local storage
                                localStorage.setItem("username", username);
                                localStorage.setItem("email", email);
                                
                                alert("Login Successful!");
                                location.replace("profile.html");
                            }
                            // $("#itemlist").append('<tr><td>' + id + '</td><td>' + item +
                            //     '</td><td>' + quantity + '</td></tr>');
                        }
                    } else {
                        alert("Email or password do not match");
                    }
                }, function (transaction, err) {
                    alert('No table found.');
                });
            }
        });
    });

});