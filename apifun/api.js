var book_imgs = [];
var num_books = 0;
var book_img_counter = 0;

function getBooks() {

    request =  new XMLHttpRequest();
    console.log("1");

    request.open("GET", "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=uKhWBGBTxPl7S1WUiiB4M6drlYaPaq4y", true);
    console.log("2");

    request.onreadystatechange = function() {
        console.log("3");
        if (request.readyState == 4 && request.status == 200) {
            console.log("5");
            result = request.responseText;
            books = JSON.parse(result);
            displayBooks(books);
            book_imgs = book_arr(books);
            document.getElementById("frame").src = book_imgs[0];
        } else if (request.readyState == 4 && request.status != 200) {
            document.getElementById("books").innerHTML = "Unable to load data.";
        } else if (request.readyState == 3) {
            document.getElementById("books").innerHTML = "Not ready.";
        }
    }
    request.send();
    console.log("4");
}

function displayBooks(bookob) {
    var display = document.getElementById("books");
    //the number of results
    num_books = bookob["num_results"];
    //the array of books
    var book_list = bookob["results"]["books"];

    var results = "<tr><th>Rank</th><th>Title</th><th>Author</th></tr>";
    for (i = 0; i < num_books; i++) {
        results += "<tr><td>" + (i+1) + "</td><td>" + book_list[i]["title"] + "</td><td>" + book_list[i]["author"] + "</td></tr>";
    }
    display.innerHTML = results;
}

function imageRotate() {
    book_img_counter++;
    if (book_img_counter >= num_books) {
        book_img_counter = 0;
    }
    document.getElementById("frame").src = book_imgs[book_img_counter];
}

function book_arr(bookob) {
    let arr = [];
    for (i = 0; i < bookob["num_results"]; i++) {
        arr.push(bookob["results"]["books"][i]["book_image"]);
    }
    return arr;
}
